import typescript from "@rollup/plugin-typescript";
import copy from 'rollup-plugin-copy'
import { cleandir } from "rollup-plugin-cleandir";
import scss from "rollup-plugin-scss";
import replaceHtmlVars from "rollup-plugin-replace-html-vars";
import { nodeResolve } from "@rollup/plugin-node-resolve";
const OUT_DIR = '../dist';
const config = [
    {
        input: 'app/index.ts',
        output: [
            {
                dir: OUT_DIR,
                format: 'iife',
                sourcemap: true
            }
        ],
        plugins: [
            nodeResolve(),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            scss({ fileName: 'index.css' }),
            replaceHtmlVars({
                files: 'public/index.html',
                from: /__build__/g,
                to: Date.now()
            }),
            copy({
                targets: [
                    { src: 'public/**/*.html', dest: OUT_DIR }
                ]
            }),
            cleandir(OUT_DIR)
        ]
    }
]

export default config;