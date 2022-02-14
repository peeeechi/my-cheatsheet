// import 'highlight.js/styles/dark.css'
// import 'highlight.js/styles/github-dark.css'
// import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/base16/solarized-dark.css'
import 'highlight.js/styles/atom-one-dark.css'
import {marked} from 'marked';
import hljs from 'highlight.js';

const textAlign: {[key in "center" | "left" | "right"]: string} = {
    "center": "text-center",
    "left": "text-left",
    "right": "text-right",
};
const defaultFont = "font-sans";

type Md2HtmlRenderer = {
    render: (md: string) => string;
};

const rendererClassis = {
    header: [
        // header 1
        [
            "text-6xl",
            textAlign["center"],
            "underline",
            defaultFont,
        ],
        // header 2
        [
            "text-5xl",
            defaultFont,
        ],
        // header 3
        [
            "text-4xl",
            defaultFont,
        ],
        // header 4
        [
            "text-3xl",
            defaultFont,
        ],
        // header 5
        [
            "text-2xl",
            defaultFont,
        ],
        // header 6
        [
            "text-xl",
            defaultFont,
        ],
    ],
    table: [
        "border",
        "border-gray-600",
        "rounded-md"
    ],
    thead: [
        "border",
        "bg-gray-200",
        "border-gray-600",
        "rounded-md"
    ],
    tbody: [
        "mx-2",
        "my-2",
        "border",
        "border-gray-600",
        "rounded-md"
    ],
    tr: [
        "border",
        "border-gray-600",
    ],
    th: [
        "px-2",
        "py-2",
        "border",
        "border-gray-600",
        "rounded-md"
    ],
    td: [
        "px-2",
        "py-2",
        "border",
        "border-gray-600",
        "rounded-md"
    ],
    pre: [
        "px-2",
        "py-1",
        "rounded-md"
    ],
    code: [
        "hljs",
        "py-1",
        "px-1",
        "mx-1",
        "my-1"
    ],
    codespan: [
        "hljs",
        "py-1",
        "px-1",
        "mx-1",
        "my-1"
    ],
    a: [
        "underline",
        "text-green-600"
    ],
    ul: [
        'list-disc',
        'list-inside'
    ],
    ol: [
        'list-decimal',
        'list-inside'
    ]
};

export default function createRenderer() {

    const r = new marked.Renderer();

    // h1,h2,h3 ....
    r.heading = (text, level) => {
        let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level} class="${rendererClassis.header[level - 1].join(' ')}">${text}</h${level}>`;
    }
    // table
    r.table = function(header, body) {
        if (body) body = `<tbody class="${rendererClassis.tbody.join(' ')}">${body}</tbody>`;
        const thead = `<thead class="${rendererClassis.thead.join(' ')}">${header}</thead>`;

        return `<table class="${rendererClassis.table.join(' ')}">${thead}${body}</table>`;
    };
    // tr
    r.tablerow = function(tr) {
        return `<tr class="${rendererClassis.tr.join(' ')}">${tr}</tr>`;
    };
    // th or td
    r.tablecell = function(content, flgs) {
        const classis = flgs.header? [...rendererClassis.th] : [...rendererClassis.td];
        if (flgs.align) {
            classis.push(textAlign[flgs.align]);
        }
        const elm = flgs.header? 'th' : 'td';
        return `<${elm} class="${classis.join(' ')}">${content}</${elm}>`
    }
    // code(`{code}`)
    r.codespan = function(code) {
        return `<code class="${rendererClassis.codespan.join(' ')}">${hljs.highlightAuto(code).value}</code>`
    }
    // code block (```{language}{code}```)
    r.code = function (code, language) {
        const codeClassis = [...rendererClassis.code];
        if (language) {
            codeClassis.push(language);
        }

        return `<pre class="${rendererClassis.pre.join(' ')}"><span class="text-gray-600">${language}:</span><code class="${codeClassis.join(' ')}">${hljs.highlightAuto(code).value}</code></pre>`;
    }
    // a
    r.link = function(href, title, text) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="${rendererClassis.a.join(' ')}">${text}</a>`
    }
    // ul or ol
    r.list = function(body: string, orderd: boolean, start: number) {

        // console.table({body: body, orderd: orderd, start: start});

        const classis = orderd? rendererClassis.ol : rendererClassis.ul;
        const elm = orderd? 'ol' : 'ul';
        return `<${elm} class="${classis.join(' ')}">${body}</${elm}>`;
    }
    // li
    r.listitem = function(text: string, task: boolean, cheacked: boolean) {

        console.table({text: text, task: task, cheacked: cheacked});
        return `<li >${text}</li>`;
    }

    marked.setOptions({
        renderer: r,
        langPrefix: '',
        // highlight: function (code: string, lang: string) {
        //     return hljs.highlightAuto(code, [lang]).value;
        // }
    });

    const md2Html =  {
        render: (md) => {
            return marked(md);
        }
    } as Md2HtmlRenderer;

    return md2Html;
}
