function lexer(str) {
    const tokens = [];
    let i = 0;

    while (i < str.length) {
        const char = str[i];

        if (char === '*' || char === '+' || char === '?') {
            tokens.push({type: 'MODIFIER', index: i, value: str[i++]});
            continue;
        }

        if (char === '\\') {
            tokens.push({type: 'ESCAPED_CHAR', index: i++, value: str[i++]});
            continue;
        }

        if (char === '{') {
            tokens.push({type: 'OPEN', index: i, value: str[i++]});
            continue;
        }

        if (char === '}') {
            tokens.push({type: 'CLOSE', index: i, value: str[i++]});
            continue;
        }

        if (char === ':') {
            let name = '';
            let j = i + 1;

            while (j < str.length) {
                const code = str.charCodeAt(j);

                if (
                    // `0-9`
                    (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95
                ) {
                    name += str[j++];
                    continue;
                }

                break;
            }

            if (!name) throw new TypeError(`Missing parameter name at ${i}`);

            tokens.push({type: 'NAME', index: i, value: name});
            i = j;
            continue;
        }

        if (char === '(') {
            let count = 1;
            let pattern = '';
            let j = i + 1;

            if (str[j] === '?') {
                throw new TypeError(`Pattern cannot start with "?" at ${j}`);
            }

            while (j < str.length) {
                if (str[j] === '\\') {
                    pattern += str[j++] + str[j++];
                    continue;
                }

                if (str[j] === ')') {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                } else if (str[j] === '(') {
                    count++;
                    if (str[j + 1] !== '?') {
                        throw new TypeError(
                            `Capturing groups are not allowed at ${j}`
                        );
                    }
                }

                pattern += str[j++];
            }

            if (count) throw new TypeError(`Unbalanced pattern at ${i}`);
            if (!pattern) throw new TypeError(`Missing pattern at ${i}`);

            tokens.push({type: 'PATTERN', index: i, value: pattern});
            i = j;
            continue;
        }

        tokens.push({type: 'CHAR', index: i, value: str[i++]});
    }

    tokens.push({type: 'END', index: i, value: ''});

    return tokens;
}

function parse(str, options) {
    const tokens = lexer(str);
    const {prefixes = './'} = options;
    const defaultPattern = `[^${escapeString(options.delimiter || '/#?')}]+?`;
    const result = [];
    let key = 0;
    let i = 0;
    let path = '';

    const tryConsume = type => {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };

    const mustConsume = type => {
        const value = tryConsume(type);
        if (value !== undefined) return value;
        const {type: nextType, index} = tokens[i];
        throw new TypeError(
            `Unexpected ${nextType} at ${index}, expected ${type}`
        );
    };

    const consumeText = () => {
        let result = '';
        let value;
        // tslint:disable-next-line
        while ((value = tryConsume('CHAR') || tryConsume('ESCAPED_CHAR'))) {
            result += value;
        }
        return result;
    };

    while (i < tokens.length) {
        const char = tryConsume('CHAR');
        const name = tryConsume('NAME');
        const pattern = tryConsume('PATTERN');

        if (name || pattern) {
            let prefix = char || '';

            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = '';
            }

            if (path) {
                result.push(path);
                path = '';
            }

            result.push({
                name: name || key++,
                prefix,
                suffix: '',
                pattern: pattern || defaultPattern,
                modifier: tryConsume('MODIFIER') || '',
            });
            continue;
        }

        const value = char || tryConsume('ESCAPED_CHAR');
        if (value) {
            path += value;
            continue;
        }

        if (path) {
            result.push(path);
            path = '';
        }

        const open = tryConsume('OPEN');
        if (open) {
            const prefix = consumeText();
            const name = tryConsume('NAME') || '';
            const pattern = tryConsume('PATTERN') || '';
            const suffix = consumeText();

            mustConsume('CLOSE');

            result.push({
                name: name || (pattern ? key++ : ''),
                pattern: name && !pattern ? defaultPattern : pattern,
                prefix,
                suffix,
                modifier: tryConsume('MODIFIER') || '',
            });
            continue;
        }

        mustConsume('END');
    }

    return result;
}

function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}

function flags(options) {
    return options && options.sensitive ? '' : 'i';
}

function tokensToFunction(tokens, options) {
    const reFlags = flags(options);
    const {encode = x => x, validate = true} = options;

    const matches = tokens.map(token => {
        if (typeof token === 'object') {
            return new RegExp(`^(?:${token.pattern})$`, reFlags);
        }
    });

    return data => {
        let path = '';

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (typeof token === 'string') {
                path += token;
                continue;
            }

            const value = data ? data[token.name] : undefined;
            const optional = token.modifier === '?' || token.modifier === '*';
            const repeat = token.modifier === '*' || token.modifier === '+';

            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError(
                        `Expected "${token.name}" to not repeat, but got an array`
                    );
                }

                if (value.length === 0) {
                    if (optional) continue;

                    throw new TypeError(
                        `Expected "${token.name}" to not be empty`
                    );
                }

                for (let j = 0; j < value.length; j++) {
                    const segment = encode(value[j], token);

                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError(
                            `Expected all "${token.name}" to match "${token.pattern}", but got "${segment}"`
                        );
                    }

                    path += token.prefix + segment + token.suffix;
                }

                continue;
            }

            if (typeof value === 'string' || typeof value === 'number') {
                const segment = encode(String(value), token);

                if (validate && !matches[i].test(segment)) {
                    throw new TypeError(
                        `Expected "${token.name}" to match "${token.pattern}", but got "${segment}"`
                    );
                }

                path += token.prefix + segment + token.suffix;
                continue;
            }

            if (optional) continue;

            const typeOfMessage = repeat ? 'an array' : 'a string';
            throw new TypeError(
                `Expected "${token.name}" to be ${typeOfMessage}`
            );
        }

        return path;
    };
}

function compile(str, options = {}) {
    return tokensToFunction(parse(str, options), options);
}

const t = compile('/api/:id')({id: 1});
console.log(t); // /api/1
