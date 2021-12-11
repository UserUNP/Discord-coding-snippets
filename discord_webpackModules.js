var discordModules = (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m);

function getModule(...props) {
    return getModuleByFilter(Filters.byProperties(props), true);
}






/////////////////////////////////////// DEPENDENCIES SECTION vvvvvvvvvvv

// 1: Module filters, https://rauenzi.github.io/BDPluginLibrary/docs/modules_webpackmodules.js.html#line-18
// 2: Get module using filters, https://rauenzi.github.io/BDPluginLibrary/docs/modules_webpackmodules.js.html#line-125

// dep1 //////////////////////////////////////////////////////////////////////////////////////////////
//               CREDIT TO ZERE'S PLUGIN LIBRARY at https://rauenzi.github.io/BDPluginLibrary/
class Filters {
    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties.
     * @param {Array<string>} props - Array of property names
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byProperties(props, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            for (let p = 0; p < props.length; p++) {
                if (module[props[p]] === undefined) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties on the object's prototype.
     * @param {Array<string>} fields - Array of property names
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties on the object's prototype
     */
    static byPrototypeFields(fields, filter = m => m) {
        return module => {
            const component = filter(module);
            if (!component) return false;
            if (!component.prototype) return false;
            for (let f = 0; f < fields.length; f++) {
                if (module.prototype[fields[f]] === undefined) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a regex.
     * @param {RegExp} search - A RegExp to check on the module
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byCode(search, filter = m => m) {
        return module => {
            const method = filter(module);
            if (!method) return false;
            let methodString = "";
            try {methodString = method.toString([]);}
            catch (err) {methodString = method.toString();}
            return methodString.search(search) !== -1;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by strings.
     * @param {...String} search - A RegExp to check on the module
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of strings
     */
    static byString(...strings) {
        return module => {
            let moduleString = "";
            try {moduleString = module.toString([]);}
            catch (err) {moduleString = module.toString();}
            for (const s of strings) {
                if (!moduleString.includes(s)) return false;
            }
            return true;
        };
    }

    /**
     * Generates a {@link module:WebpackModules.Filters~filter} that filters by a set of properties.
     * @param {string} name - Name the module should have
     * @param {module:WebpackModules.Filters~filter} filter - Additional filter
     * @returns {module:WebpackModules.Filters~filter} - A filter that checks for a set of properties
     */
    static byDisplayName(name) {
        return module => {
            return module && module.displayName === name;
        };
    }

    /**
     * Generates a combined {@link module:WebpackModules.Filters~filter} from a list of filters.
     * @param {...module:WebpackModules.Filters~filter} filters - A list of filters
     * @returns {module:WebpackModules.Filters~filter} - Combinatory filter of all arguments
     */
    static combine(...filters) {
        return module => {
            return filters.every(filter => filter(module));
        };
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

// dep2 //////////////////////////////////////////////////////////////////////////////////////////////
function getModuleByFilter(filter, first = true) {
    const wrappedFilter = (m) => {
        try {return filter(m);}
        catch (err) {return false;}
    };
    const rm = [];
    for (const index in discordModules) {
        if (!discordModules[index]) continue;
        const module = discordModules[index];
        const {exports} = module;
        let foundModule = null;
        if (!exports) continue;
        if (exports.__esModule && exports.default && wrappedFilter(exports.default)) foundModule = exports.default;
        if (wrappedFilter(exports)) foundModule = exports;
        if (!foundModule) continue;
        if (first) return foundModule;
        rm.push(foundModule);
    }
    return first || rm.length == 0 ? undefined : rm;
}
