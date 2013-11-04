/**
 * @file decodeHTML
 * @author firede(firede@firede.us)
 *         treelite(c.xinle@gmail.com)
 */

define(function () {

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
     * HTML解码
     *
     * @public
     * @param {string} str
     * @return {string}
     */
    function decodeHTML(str) {
        if (!str) {
            return '';
        }

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
    }

    return decodeHTML;
});
