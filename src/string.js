/**
 * @file string utils
 * @author treelite(c.xinle@gmail.com),firede(firede@firede.us)
 */

define(function () {

    var exports = {};

    /**
     * 常用字符实体
     * 
     * @inner
     * @type {Object}
     */
    var htmlEntities = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        // 单引号通常使用`&#39;`，但移动端可能不会考虑IE兼容性，所以加入`&apos;`的情况
        apos: "'"
    };

    /**
     * HTML编码
     *
     * @public
     * @param {string} str
     * @return {string}
     */
    exports.encodeHTML = function (str) {
        if (!str) return '';

        // 只需将可能与HTML产生冲突的关键字符encode即可
        return String(str).replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
    };

    /**
     * HTML解码
     *
     * @public
     * @param {string} str
     * @return {string}
     */
    exports.decodeHTML = function (str) {
        if (!str) return '';

        // 将常用字符实体与采用了10进制、16进制编号的字符实体decode
        return (str + '').replace(/\&([^;]+);/g, function(entity, code) {
            var match;

            if (code in htmlEntities) {
                return htmlEntities[code];
            }
            else if (match = code.match(/^#x([\da-fA-F]+)$/)) {
                return String.fromCharCode(parseInt(match[1], 16));
            }
            else if (match = code.match(/^#(\d+)$/)) {
                return String.fromCharCode(parseInt(match[1], 10));
            }
            else {
                return entity;
            }
        });
    };

    /**
     * 字符串格式化
     * 替换字符串中的${xx}字符
     * 将xx作为data的字段名或者参数
     * 用返回的结果加以替换
     *
     * @public
     * @param {string} template
     * @param {Object|Array|Function} data
     * @return {string}
     */
    exports.format = function (template, data) {
        if (!template) return '';
        if (data == null) return template;

        var replacer = ( typeof data === 'function' )
                ? data
                : function (key) {
                    var res = data[key];
                    return res == null ? '' : res;
                };

        return (template + '').replace(/\$\{(.+?)\}/g, function (match, key) {
            return replacer(key);
        });
    };

    return exports;
});
