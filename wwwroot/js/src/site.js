window.store_localdata = function (name, value) {
    window.localStorage.setItem(name, value);
};

window.retrieve_localdata = function (name) {
    return window.localStorage.getItem(name);
};

window.clear_localdata = function (name) {
    window.localStorage.removeItem(name);
};

window.store_sessiondata = function (name, value) {
    window.sessionStorage.setItem(name, value);
};

window.retrieve_sessiondata = function (name) {
    return window.sessionStorage.getItem(name);
};

window.clear_sessiondata = function (name) {
    window.sessionStorage.removeItem(name);
};

window.clear_sessiondata = function (name) {
    window.sessionStorage.removeItem(name);
};

function nullishCoalescing(val, otherVal) {
    if (typeof val === typeof undefined && typeof otherVal !== typeof undefined) {
        return otherVal;
    }

    if (val !== undefined && val !== null) {
        return val;
    }

    return otherVal;
}

function IsNullish(val) {
    if (typeof val === typeof undefined) {
        return true;
    }

    if (val !== undefined && val !== null) {
        return false;
    }
    return true;
}

function createHtmlElement(options) {
    if (options.tag === undefined) {
        return null;
    }

    var tag = document.createElement(options.tag);

    if (options.rel !== undefined) {
        tag.setAttribute("rel", options.rel);
    }
    if (options.href !== undefined) {
        tag.setAttribute("href", options.href);
    }

    if (options.type !== undefined) {
        tag.setAttribute("type", options.type);
    }
    if (options.src !== undefined) {
        tag.setAttribute("src", options.src);
    }

    if (options.class !== undefined) {
        tag.setAttribute("class", options.class);
    }

    if (options.onload !== undefined) {
        tag.setAttribute("onload", options.onload);
    }

    if (options.content !== undefined) {
        tag.innerHTML = options.content;
    } else if (options.html !== undefined) {
        tag.setAttribute("html", options.html);
    }

    if (options.location !== undefined) {
        options.location.appendChild(tag);
    }

    return tag;
}

var sls = function (strings, ...values) {
    let output = "";
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];

    let lines = output.split(/(?:\r\n|\n|\r)/);

    return lines
        .map((line) => {
            return line.replace(/^\s+/gm, "");
        })
        .join(" ")
        .trim();
};

function linspace(a, b, n) {
    if (typeof n === "undefined") {
        n = Math.max(Math.round(b - a) + 1, 1);
    }
    if (n < 2) {
        return n === 1 ? [a] : [];
    }
    var i;
    const ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
    }
    return ret;
}

function assert(predicate) {
    if (predicate === undefined) {
        console.error("assert predicate is undefined.");
    } else {
        assert.ok(predicate, "test failed");
    }
}

const MediaTypes = {
    ArrayBuffer: "arraybuffer",
    Blob: "blob",
    FormData: "multipart/form-data",
    Json: "application/json",
    Text: "text/plain"
};

async function clientSetVariable(rootUrl, variableName, variableData, mediaType = MediaTypes.Json) {
    const response = await fetch(`${rootUrl}/data/${variableName}`, {
        method: "POST",
        cache: "no-cache",
        mode: "same-origin",
        body: JSON.stringify(variableData),
        headers: {
            "Content-Type": `${mediaType}`
        }
    });

    return await response;
}

async function SetVariable(variableName, variableData, mediaType = MediaTypes.Json) {
    const csharpVariable = await clientSetVariable(window.location.origin, variableName, variableData, mediaType).then(function (variable) {
        return variable;
    });

    if (csharpVariable !== null) {
        return csharpVariable;
    }

    return [];
}

async function clientGetVariable(rootUrl, variable) {
    fetch(`${rootUrl}/data/${variable}`, {
        method: "GET",
        cache: "no-cache",
        mode: "same-origin"
    }).then(
        function (response) {
            if (response.headers["Content-Type"] === "text/plain") {
                return response.text();
            }
            if (response.headers["Content-Type"] === "application/json") {
                return response.json();
            }
            if (response.headers["Content-Type"] === "multipart/form-data") {
                return response.formData();
            }
            if (response.headers["Content-Type"] === "arraybuffer") {
                return response.arrayBuffer();
            }

            return response.blob();
        },
        function (err) {
            console.error(err);
        }
    );

    return null;
}

async function GetVariable(variableName) {
    return await clientGetVariable(window.location.origin, variableName).then(function (variable) {
        return variable;
    });
}

function clientGetVariableUrl(rootUrl, variable) {
    return `${rootUrl}/data/${variable}`;
}

function GetVariableUrl(variableName) {
    return clientGetVariableUrl(window.location.origin, variableName);
}

const DEFAULT_TIMEOUT = 100;

function waitUntil(predicate, timeout, started) {
    started = nullishCoalescing(started, Date.now());

    if (predicate) {
        return true;
    }

    if (started + timeout < Date.now()) {
        throw new Error("timed out");
    }

    setTimeout(function () {
        waitUntil(predicate, timeout, started);
    }, timeout);
}

function spinAndWaitUntil(predicate, timeout = null) {
    timeout = nullishCoalescing(timeout, DEFAULT_TIMEOUT);
    return waitUntil(predicate, timeout, Date.now());
}

const colorMethods = {
    inputA: "",
    inputB: "",
    inputC: "",
    gradientElement: "",

    // Convert a hex color to an RGB array e.g. [r,g,b]
    // Accepts the following formats: FFF, FFFFFF, #FFF, #FFFFFF
    hexToRgb: function (hex) {
        var parts;
        // Remove the hash if given
        hex = hex.replace("#", "");
        // If invalid code given return white
        if (hex.length !== 3 && hex.length !== 6) {
            return [255, 255, 255];
        }
        // Double up charaters if only three suplied
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        // Convert to [r,g,b] array
        var r = parseInt(hex.substr(0, 2), 16);
        var g = parseInt(hex.substr(2, 2), 16);
        var b = parseInt(hex.substr(4, 2), 16);

        return [r, g, b];
    },

    // Converts an RGB color array e.g. [255,255,255] into a hexidecimal color value e.g. 'FFFFFF'
    rgbToHex: function (color) {
        // Set boundries of upper 255 and lower 0
        color[0] = color[0] > 255 ? 255 : color[0] < 0 ? 0 : color[0];
        color[1] = color[1] > 255 ? 255 : color[1] < 0 ? 0 : color[1];
        color[2] = color[2] > 255 ? 255 : color[2] < 0 ? 0 : color[2];

        return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
    },

    // Pads a number with specified number of leading zeroes
    zeroFill: function (number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
        }
        return number;
    },

    // Generates an array of color values in sequence from 'colorA' to 'colorB' using the specified number of steps
    Gradient: function (colorA, colorB, steps, valueA, valueB) {
        var result = [],
            rInterval,
            gInterval,
            bInterval;

        colorA = this.hexToRgb(colorA); // [r,g,b]
        colorB = this.hexToRgb(colorB); // [r,g,b]
        steps -= 1; // Reduce the steps by one because we're including the first item manually

        // Calculate the intervals for each color
        var rStep = (Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0])) / steps;
        var gStep = (Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1])) / steps;
        var bStep = (Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2])) / steps;
        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

        result.push({value: valueA, color: "#" + this.rgbToHex(colorA)});

        // Set the starting value as the first color value
        var rVal = colorA[0];
        var gVal = colorA[1];
        var bVal = colorA[2];
        var vVal = valueA;

        // Loop over the steps-1 because we're includeing the last value manually to ensure it's accurate
        for (var i = 0; i < steps - 1; i++) {
            // If the first value is lower than the last - increment up otherwise increment down
            rVal = colorA[0] < colorB[0] ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
            gVal = colorA[1] < colorB[1] ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
            bVal = colorA[2] < colorB[2] ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
            vVal += vSteps;
            result.push({value: vVal, color: "#" + this.rgbToHex([rVal, gVal, bVal])});
        }

        result.push({value: valueB, color: "#" + this.rgbToHex(colorB)});

        return result;
    },

    GradientRgb: function (variable, colorA, colorB, steps, valueA, valueB) {
        var result = [];
        var rInterval;
        var gInterval;
        var bInterval;

        result.push("interpolate");
        result.push(["linear"]);
        result.push(["get", variable]);

        colorA = this.hexToRgb(colorA); // [r,g,b]
        colorB = this.hexToRgb(colorB); // [r,g,b]
        steps -= 1; // Reduce the steps by one because we're including the first item manually

        // Calculate the intervals for each color
        var rStep = (Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0])) / steps;
        var gStep = (Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1])) / steps;
        var bStep = (Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2])) / steps;
        var vSteps = (Math.max(valueA, valueB) - Math.min(valueA, valueB)) / steps;

        result.push(valueA);
        result.push(`rgb(${colorA[0]},${colorA[1]},${colorA[2]})`);

        // Set the starting value as the first color value
        var rVal = colorA[0];
        var gVal = colorA[1];
        var bVal = colorA[2];
        var vVal = valueA;

        // Loop over the steps-1 because we're includeing the last value manually to ensure it's accurate
        for (var i = 0; i < steps - 1; i++) {
            // If the first value is lower than the last - increment up otherwise increment down
            rVal = colorA[0] < colorB[0] ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
            gVal = colorA[1] < colorB[1] ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
            bVal = colorA[2] < colorB[2] ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
            vVal += vSteps;
            result.push(vVal);
            result.push(`rgb(${rVal},${gVal},${bVal})`);
        }

        result.push(valueB);
        result.push(`rgb(${colorB[0]},${colorB[1]},${colorB[2]})`);

        return result;
    }
};
