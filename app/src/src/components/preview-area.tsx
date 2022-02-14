import React, { useEffect, useState } from 'react';
import createRenderer from '../lib/md2html';

type PreviewArgs = {
    md: string,
    id: string
};

export default function PreView({ md, id }: PreviewArgs) {

    const [mdText, setText] = useState(md);
    const md2html = createRenderer();

    // 最初にから文字をセットしてdiv element を作っておく
    // useEffect(() => {setText('')}, []);
    // useEffect(() => {
    //     const html = md2html.render(md);
    //     const div = document.getElementById('preview');
    //     if (div) {
    //         div.innerHTML = html;
    //     }
    // }, [mdText]);
    
    const html = md2html.render(md);
    const div = document.getElementById('preview');
    if (div) {
        div.innerHTML = html;
    }
    return (
        <>
            <div className="mr-2 ml-0 my-2 px-2 py-2 border border-lime-400 rounded-md" id={id} />
        </>
    );
}