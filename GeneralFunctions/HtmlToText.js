// export const HtmlToText = (html) => {
//     var i = 0;
//     while (html && i <= html.length) {
//         if (html.includes('<style') || html.includes('<style>')) {
//             html = html.slice(0, html.indexOf('<style')) + html.slice(html.indexOf('</style>') + 8, html.length)
//             i++;
//         }
//         else {
//             break;
//         }
//     }
//     return html;
// }

export const HtmlToText = html => {
    const regex = /<\/?(?!(?:highlight)\b)[a-zA-z](?:[^>"']|"[^"]*"|'[^']*')*>/g
    const plainText = html && html.replace && html.replace(regex, '')
    return plainText
}