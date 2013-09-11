/**
 * @file string utils
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) 
            == '[object Function]';
    }

    return {
        /**
         * HTML编码
         *
         * @public
         * @param {string} str
         * @return {string}
         */
        encodeHTML: function (str) {
            return str.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
        },

        /**
         * HTML解码
         *
         * @public
         * @param {string} str
         * @return {string}
         */
        decodeHTML: function (str) {
            return str.replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, '&');
        },

        /**
         * 字符串格式化
         * 替换字符串中的#{xx}字符
         * 将xx作为data的字段名或者参数
         * 用返回的结果加以替换
         *
         * @public
         * @param {string} str
         * @param {Object|Array|Function} data
         * @return {string}
         */
        format: function (str, data) {
            var replacer = isFunction(data) 
                    ? data
                    : function (key) {
                        var res = data[key];
                        return res === undefined ? '' : res;
                    };

            return str.replace(/#\{([^}]+)\}/g, function ($0, $1) {
                return replacer($1);
            });
        }

    };
});
