import { Hono } from 'https://deno.land/x/hono/mod.ts';
import { serve } from 'https://deno.land/std@0.167.0/http/server.ts';
import { Language, minifyHTML } from "https://deno.land/x/minifier/mod.ts";

const app = new Hono();

app.get('/', (c) => {
    return c.html(minifyHTML(`
    <!-- ここを見た記念に良かったらTwitterフォローしてや -->
    <!DOCTYPE html>
        <html>

        <head prefix="og: http://ogp.me/ns# website: http://ogp.me/ns/website#">
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <title>SubDomain ShortCutLink</title>
            <meta name="description" content="サブドメインを使用した短縮リンクを作成できます。">

            <link rel="icon shortcut" href="https://thumb.ac-illust.com/6d/6deba8fc6b85c0e6d49db7777a5a08d7_t.jpeg">

            <meta property="og:image" content="https://thumb.ac-illust.com/6d/6deba8fc6b85c0e6d49db7777a5a08d7_t.jpeg">
            <meta property="og:title" content="SubDomain ShortCutLink">
            <meta property="og:description" content="サブドメインを使用した短縮リンクを作成できます。">
            <meta property="og:site_name" content="SubDomain ShortCutLink">
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://s.ame-x.net">
            <meta property="og:locale" content="ja_JP">

            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:image" content="https://thumb.ac-illust.com/6d/6deba8fc6b85c0e6d49db7777a5a08d7_t.jpeg">
            <meta property="twitter:title" content="SubDomain ShortCutLink">
            <meta property="twitter:description" content="サブドメインを使用した短縮リンクを作成できます。">
        </head>

        <body>
            <div id="app" class="w-full h-[90vh] flex flex-col items-center justify-center">
                <h1 class="text-3xl font-bold font-mono mb-10">⛓ SubDomain ShortCutLink</h1>
                <input placeholder="https://website.com" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline" v-model="url"/>
                <button @click="convert" class="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
                <input placeholder="https://xxxxxx.s.ame-x.net" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline" v-model="result"/>
                <button @click="copy" class="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Copy</button>
            </div>
            <div class="text-center h-[10vh]">
                <a href="https://x.com/amex2189" class="text-green-500 font-bold">@ame_x 2023 All Rights Reserved.</a>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
            <script>
                const App = new Vue({
                    el: '#app',
                    data: {
                        url: '',
                        result: ''
                    },
                    methods: {
                        convert() {
                            function checkUri(str) { 
                                try {
                                    new URL(str);
                                    return true;
                                }catch(e) {
                                    return false;
                                }
                            } 

                            let code = "";

                            if(!checkUri(this.url)){
                                return Swal.fire("Bad!", "Invalid URL!", "error");
                            }
                            
                            fetch('https://api.activetk.jp/urlmin/set?url=' + encodeURIComponent(this.url))
                            .then((response) => response.json())
                            .then((data) => {
                                code = data.Code
                                this.result = "https://" + code.split().reverse().join("") + ".s.ame-x.net";
                            });
                        },
                        copy() {
                            // copy
                            function c2c (value) {
                                if (navigator.clipboard) {
                                  return navigator.clipboard.writeText(value).then(function () {
                                    Swal.fire("Good job!", "Success to copy!", "success");
                                  })
                                } else {
                                    Swal.fire("Bad!", "Failed to copy!", "error");
                                }
                            }
                            
                            c2c(this.result);
                        }
                    }
                })
            </script>

            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        </body>

        </html>
    `, {
        minifyCSS: true,
        minifyJS: true,
    }))
})

serve(app.fetch, { port: 4444 });