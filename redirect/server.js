import { Hono } from 'https://deno.land/x/hono/mod.ts';
import { serve } from 'https://deno.land/std@0.167.0/http/server.ts';

const app = new Hono();

app.get('/', (c) => {
    const url = c.req.url.replace("https://", "").replace("http://", "").replace("<", "").replace(">", "").split(".")[0];

    if (!/.{6}\..*/.test(url)) {
        return c.html("Not found");
    }

    return c.redirect('https://rinu.cf/' + url.split().reverse().join());
})

serve(app.fetch, { port: 3333 });