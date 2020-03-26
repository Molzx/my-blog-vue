/*
 * @Author       : xuzhenghao
 * @Date         : 2020-02-13 10:19:44
 * @LastEditors  : xuzhenghao
 * @LastEditTime : 2020-02-13 21:03:48
 * @FilePath     : \VueProjects\my-blog\src\assets\data\article.js
 * @Description  : 这是一些注释
 */
let data = {
  article: {
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        title: 'gradle环境搭建',
        artist:
          '你总是要我演绎虐到你心痛，然后又要感动到你心碎，似是换了一颗心。其实我只不过是你的左手，在你的情感世间里陪你左右互搏，打到天花乱坠，黯然神伤。'
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        title: '耐人寻味的CSS属性font-family',
        artist:
          '伤的跌跌撞撞，像折翼的自由，一跳跃就触碰那条条框框，触碰那相思交织的忆中人。你总是让人印象深刻，出其不意，染指你的染指。第一次见到你，我就趣味的告白，“我喜欢你”，而你却对我说“相见恨晚”'
      }
    ],
    records: [
      {
        articleId: '1',
        userId: '1',
        categoryId: '1',
        title: '6666',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '0',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '112',
        liked: '1212',
        collected: '21',
        shared: '22',
        admirationStatus: '0',
        copyrightStatus: '0',
        reprintStatus: '0',
        commentStatus: '0',
        publishedStatus: '0',
        recommendStatus: '0',
        version: '1',
        createdTime: '2019-2-20 13:59:52',
        created_by: '1',
        updatedTime: '2019-2-23 11:30:16',
        updated_by: '2',
        status: '0',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '2',
        userId: '0',
        categoryId: '10',
        title: '生而为人',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '0',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '12',
        liked: '1',
        collected: '1',
        shared: '1',
        admirationStatus: '1',
        copyrightStatus: '1',
        reprintStatus: '1',
        commentStatus: '0',
        publishedStatus: '0',
        recommendStatus: '1',
        version: '1',
        createdTime: '2018-2-20 13:59:52',
        created_by: '2',
        updatedTime: '2018-2-23 11:30:44',
        updated_by: '2',
        status: '1',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '3',
        userId: '2',
        categoryId: '1',
        title: '2333',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '0',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><code class="lang-python">@requires_authorization\ndef somefunc(param1=\'\', param2=0):\n    \'\'\'A docstring\'\'\'\n    if param1 &gt; param2: # interesting\n        print \'Greater\'\n    return (param2 - param1 + 1) or None\nclass SomeClass:\n    pass\n&gt;&gt;&gt; message = \'\'\'interpreter\n... prompt\'\'\'\n</code></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：$\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '245',
        liked: '12',
        collected: '122',
        shared: '12',
        admirationStatus: '1',
        copyrightStatus: '1',
        reprintStatus: '1',
        commentStatus: '1',
        publishedStatus: '0',
        recommendStatus: '1',
        version: '1',
        createdTime: '2020-2-20 21:43:01',
        created_by: '2',
        updatedTime: '2020-2-23 11:29:59',
        updated_by: '2',
        status: '1',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '4',
        userId: '2',
        categoryId: '5',
        title: '新文章1',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '0',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '1',
        liked: '122',
        collected: '45',
        shared: '12',
        admirationStatus: '0',
        copyrightStatus: '0',
        reprintStatus: '0',
        commentStatus: '0',
        publishedStatus: '0',
        recommendStatus: '0',
        version: '1',
        createdTime: '2020-2-21 09:29:47',
        created_by: '2',
        updatedTime: '2020-2-23 11:30:24',
        updated_by: '2',
        status: '0',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '5',
        userId: '2',
        categoryId: '4',
        title: '转载',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '1',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '2',
        liked: '34',
        collected: '12',
        shared: '45',
        admirationStatus: '0',
        copyrightStatus: '0',
        reprintStatus: '0',
        commentStatus: '0',
        publishedStatus: '0',
        recommendStatus: '0',
        version: '1',
        createdTime: '2020-2-21 10:23:04',
        created_by: '2',
        updatedTime: '2020-2-23 11:30:35',
        updated_by: '2',
        status: '0',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '6',
        userId: '2',
        categoryId: '5',
        title: '11111',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '2',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '5',
        liked: '12',
        collected: '45',
        shared: '124',
        admirationStatus: '0',
        copyrightStatus: '1',
        reprintStatus: '1',
        commentStatus: '1',
        publishedStatus: '0',
        recommendStatus: '1',
        version: '1',
        createdTime: '2020-2-21 10:29:23',
        created_by: '2',
        updatedTime: '2020-2-23 11:31:03',
        updated_by: '2',
        status: '0',
        deleted: '0',
        categoryName: 'java'
      },
      {
        articleId: '7',
        userId: '2',
        categoryId: '9',
        title: '测试文章2',
        description:
          'CSDN-markdown编辑器 使用示例，本Markdown编辑器使用StackEdit修改而来，用它写博客，将会带来全新的体验哦，用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。',
        type: '2',
        cover: 'FL_bN8Ozmr0gAB13BsTz.jpg',
        content:
          '<h1><a id="CSDNmarkdown__1"></a>CSDN-markdown编辑器 使用示例</h1>\n<p>本Markdown编辑器使用<a href="https://github.com/benweet/stackedit" target="_blank">StackEdit</a>修改而来，用它写博客，将会带来全新的体验哦：</p>\n<ul>\n<li><strong>Markdown和扩展Markdown简洁的语法</strong></li>\n<li><strong>代码块高亮</strong></li>\n<li><strong>图片链接和图片上传</strong></li>\n<li><strong><em>LaTex</em>数学公式</strong></li>\n<li><strong>UML序列图和流程图</strong></li>\n<li><strong>离线写博客</strong></li>\n<li><strong>导入导出Markdown文件</strong></li>\n<li><strong>丰富的快捷键</strong></li>\n</ul>\n<hr />\n<h2><a id="_16"></a>快捷键</h2>\n<ul>\n<li>加粗    <code>Ctrl + B</code></li>\n<li>斜体    <code>Ctrl + I</code></li>\n<li>引用    <code>Ctrl + Q</code></li>\n<li>插入链接    <code>Ctrl + L</code></li>\n<li>插入代码    <code>Ctrl + K</code></li>\n<li>插入图片    <code>Ctrl + G</code></li>\n<li>提升标题    <code>Ctrl + H</code></li>\n<li>有序列表    <code>Ctrl + O</code></li>\n<li>无序列表    <code>Ctrl + U</code></li>\n<li>横线    <code>Ctrl + R</code></li>\n<li>撤销    <code>Ctrl + Z</code></li>\n<li>重做    <code>Ctrl + Y</code></li>\n</ul>\n<h2><a id="Markdown_31"></a>Markdown及扩展</h2>\n<blockquote>\n<p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]</p>\n</blockquote>\n<p>使用简单的符号标识不同的标题，将某些文字标记为<strong>粗体</strong>或者<em>斜体</em>，创建一个<a href="http://www.csdn.net" target="_blank">链接</a>等，详细语法参考帮助？。</p>\n<p>本编辑器支持 <strong>Markdown Extra</strong> , 　扩展了很多好用的功能。具体请参考<a href="https://github.com/jmcmanus/pagedown-extra" title="Pagedown Extra" target="_blank">Github</a>.</p>\n<h3><a id="_39"></a>表格</h3>\n<p><strong>Markdown　Extra</strong>　表格语法：</p>\n<table>\n<thead>\n<tr>\n<th>项目</th>\n<th>价格</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Computer</td>\n<td>$1600</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>$12</td>\n</tr>\n<tr>\n<td>Pipe</td>\n<td>$1</td>\n</tr>\n</tbody>\n</table>\n<p>可以使用冒号来定义对齐方式：</p>\n<table>\n<thead>\n<tr>\n<th style="text-align:left">项目</th>\n<th style="text-align:right">价格</th>\n<th style="text-align:center">数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="text-align:left">Computer</td>\n<td style="text-align:right">1600 元</td>\n<td style="text-align:center">5</td>\n</tr>\n<tr>\n<td style="text-align:left">Phone</td>\n<td style="text-align:right">12 元</td>\n<td style="text-align:center">12</td>\n</tr>\n<tr>\n<td style="text-align:left">Pipe</td>\n<td style="text-align:right">1 元</td>\n<td style="text-align:center">234</td>\n</tr>\n</tbody>\n</table>\n<h3><a id="_57"></a>定义列表</h3>\n<p><strong>Markdown　Extra</strong>　定义列表语法：<br />\n项目1</p>\n<dl>\n<dt>项目2</dt>\n<dd>\n<p>定义 A</p>\n</dd>\n<dd>\n<p>定义 B</p>\n</dd>\n<dt>项目3</dt>\n<dd>\n<p>定义 C</p>\n</dd>\n<dd>\n<p>定义 D</p>\n<blockquote>\n<p>定义D内容</p>\n</blockquote>\n</dd>\n</dl>\n<h3><a id="_76"></a>代码块</h3>\n<p>代码块语法遵循标准markdown代码，例如：</p>\n<pre><div class="hljs"><code class="lang-python"><span class="hljs-meta">@requires_authorization</span>\n<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">somefunc</span><span class="hljs-params">(param1=<span class="hljs-string">\'\'</span>, param2=<span class="hljs-number">0</span>)</span>:</span>\n    <span class="hljs-string">\'\'\'A docstring\'\'\'</span>\n    <span class="hljs-keyword">if</span> param1 &gt; param2: <span class="hljs-comment"># interesting</span>\n        <span class="hljs-keyword">print</span> <span class="hljs-string">\'Greater\'</span>\n    <span class="hljs-keyword">return</span> (param2 - param1 + <span class="hljs-number">1</span>) <span class="hljs-keyword">or</span> <span class="hljs-keyword">None</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SomeClass</span>:</span>\n    <span class="hljs-keyword">pass</span>\n<span class="hljs-meta">&gt;&gt;&gt; </span>message = <span class="hljs-string">\'\'\'interpreter\n<span class="hljs-meta">... </span>prompt\'\'\'</span>\n</code></div></pre>\n<h2><a id="github_91"></a>自定义字体颜色(github中看不到颜色):</h2>\n<p><font color=0099FF>Hello</font></p>\n<h2><a id="_94"></a>删除线</h2>\n<p><s>Hello</s></p>\n<p>###脚注<br />\n生成一个脚注<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>\n<h3><a id="_101"></a>目录</h3>\n<p>用 <code>[TOC]</code>来生成目录：</p>\n<p>[TOC]</p>\n<h3><a id="_106"></a>数学公式</h3>\n<p>使用MathJax渲染<em>LaTex</em> 数学公式，详见<a href="http://math.stackexchange.com/" target="_blank">math.stackexchange.com</a>.</p>\n<ul>\n<li>\n<p>行内公式，数学公式为：<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi mathvariant="normal">Γ</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo><mo>!</mo><mspace width="1em"></mspace><mi mathvariant="normal">∀</mi><mi>n</mi><mo>∈</mo><mi mathvariant="double-struck">N</mi></mrow><annotation encoding="application/x-tex">\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathrm">Γ</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mclose">)</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit">n</span><span class="mbin">−</span><span class="mord mathrm">1</span><span class="mclose">)</span><span class="mclose">!</span><span class="mord mathrm"><span class="mspace quad"></span><span class="mord mathrm">∀</span></span><span class="mord mathit">n</span><span class="mrel">∈</span><span class="mord mathbb">N</span></span></span></span>。</p>\n</li>\n<li>\n<p>块级公式：</p>\n<p>$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$</p>\n</li>\n</ul>\n<p>更多LaTex语法请参考 <a href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference" target="_blank">这儿</a>.</p>\n<h3><a id="UML__116"></a>UML 图:</h3>\n<p>可以渲染序列图：</p>\n<pre><code class="lang-sequence">张三-&gt;李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四--&gt;张三: 忙得吐血，哪有时间写。\n</code></pre>\n<p>或者流程图：</p>\n<pre><code class="lang-flow">st=&gt;start: 开始\ne=&gt;end: 结束\nop=&gt;operation: 我的操作\ncond=&gt;condition: 确认？\n\nst-&gt;op-&gt;cond\ncond(yes)-&gt;e\ncond(no)-&gt;op\n</code></pre>\n<ul>\n<li>关于 <strong>序列图</strong> 语法，参考 <a href="http://bramp.github.io/js-sequence-diagrams/" target="_blank">这儿</a>,</li>\n<li>关于 <strong>流程图</strong> 语法，参考 <a href="http://adrai.github.io/flowchart.js/" target="_blank">这儿</a>.</li>\n</ul>\n<h2><a id="_142"></a>离线写博客</h2>\n<p>即使用户在没有网络的情况下，也可以通过本编辑器离线写博客（直接在曾经使用过的浏览器中输入<a href="http://write.blog.csdn.net/mdeditor" target="_blank">write.blog.csdn.net/mdeditor</a> 即可。<strong>Markdown编辑器</strong>使用浏览器离线存储将内容保存在本地。</p>\n<p>用户写博客的过程中，内容实时保存在浏览器缓存中，在用户关闭浏览器或者其它异常情况下，内容不会丢失。用户再次打开浏览器时，会显示上次用户正在编辑的没有发表的内容。</p>\n<p>博客发表后，本地缓存将被删除。</p>\n<p>用户可以选择 <i class="icon-disk"></i> 把正在写的博客保存到服务器草稿箱，即使换浏览器或者清除缓存，内容也不会丢失。</p>\n<blockquote>\n<p>**注意：**虽然浏览器存储大部分时候都比较可靠，但为了您的数据安全，在联网后，<strong>请务必及时发表或者保存到服务器草稿箱</strong>。</p>\n</blockquote>\n<h2><a id="_154"></a>浏览器兼容</h2>\n<ol>\n<li>目前，本编辑器对Chrome浏览器支持最为完整。建议大家使用较新版本的Chrome。</li>\n<li>IE9以下不支持</li>\n<li>IE9, 10, 11中存在以下问题\n<ol>\n<li>不支持离线功能</li>\n<li>IE9不支持文件导入导出</li>\n<li>IE10不支持拖拽文件导入</li>\n</ol>\n</li>\n</ol>\n<hr />\n<h2><a id="csdn_Markdown_172"></a>在csdn Markdown模式下的显示效果:</h2>\n<p><a href="https://blog.csdn.net/lzuacm/article/details/81106221" target="_blank">https://blog.csdn.net/lzuacm/article/details/81106221</a></p>\n<hr class="footnotes-sep" />\n<section class="footnotes">\n<ol class="footnotes-list">\n<li id="fn1" class="footnote-item"><p>这里是 <strong>脚注</strong> 的 <em>内容</em>. <a href="#fnref1" class="footnote-backref">↩︎</a></p>\n</li>\n</ol>\n</section>\n',
        read: '12',
        liked: '12',
        collected: '14',
        shared: '12',
        admirationStatus: '0',
        copyrightStatus: '1',
        reprintStatus: '1',
        commentStatus: '1',
        publishedStatus: '0',
        recommendStatus: '0',
        version: '1',
        createdTime: '2020-2-22 11:32:43',
        created_by: '2',
        updatedTime: '2020-2-23 11:30:54',
        updated_by: '2',
        status: '0',
        deleted: '0',
        categoryName: 'java'
      }
    ]
  },
  category: {
    items: [
      { text: '学习日志等等等等等等等等你好', count: 13, icon: 'mdi-clock' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' },
      { text: '思考与感情', count: 213, icon: 'mdi-account' },
      { text: '认知升级', count: 13, icon: 'mdi-flag' },
      { text: '知识填补', count: 34, icon: 'mdi-account' },
      { text: '创意记录', count: 314, icon: 'mdi-flag' }
    ]
  },
  tag: {
    items: [
      { text: 'Work', count: 213, icon: 'mdi-account' },
      { text: 'Home Improvement', count: 213, icon: 'mdi-account' },
      { text: 'Vacation', count: 213, icon: 'mdi-account' },
      { text: 'Food', count: 213, icon: 'mdi-account' },
      { text: 'Drawers', count: 213, icon: 'mdi-account' },
      { text: 'Shopping', count: 213, icon: 'mdi-account' },
      { text: 'Art', count: 213, icon: 'mdi-account' },
      { text: 'Tech', count: 213, icon: 'mdi-account' },
      { text: 'Creative Writing', count: 213, icon: 'mdi-account' },
      { text: 'Work', count: 213, icon: 'mdi-account' },
      { text: 'Home Improvement', count: 213, icon: 'mdi-account' },
      { text: 'Vacation', count: 213, icon: 'mdi-account' },
      { text: 'Food', count: 213, icon: 'mdi-account' },
      { text: 'Drawers', count: 213, icon: 'mdi-account' },
      { text: 'Shopping', count: 213, icon: 'mdi-account' },
      { text: 'Art', count: 213, icon: 'mdi-account' },
      { text: 'Tech', count: 213, icon: 'mdi-account' },
      { text: 'Creative Writing', count: 213, icon: 'mdi-account' },
      { text: 'Work', count: 213, icon: 'mdi-account' },
      { text: 'Home Improvement', count: 213, icon: 'mdi-account' },
      { text: 'Vacation', count: 213, icon: 'mdi-account' },
      { text: 'Food', count: 213, icon: 'mdi-account' },
      { text: 'Drawers', count: 213, icon: 'mdi-account' },
      { text: 'Shopping', count: 213, icon: 'mdi-account' },
      { text: 'Art', count: 213, icon: 'mdi-account' },
      { text: 'Tech', count: 213, icon: 'mdi-account' },
      { text: 'Creative Writing', count: 213, icon: 'mdi-account' }
    ]
  },
  comment: {
    records: [
      {
        commentId: '1542338175424142145',
        parentId: null,
        ownerId: '1541062468073593543',
        type: 1,
        fromId: '555555',
        fromNickName: '张扬',
        fromAvatar: null,
        toId: null,
        toNickName: null,
        toAvatar: null,
        likeNum: 0,
        content: '你好呀',
        createdTime: '2018-11-16T03:16:15.000+0000',
        updatedTime: '2018-11-16T03:16:15.000+0000',
        childrens: []
      },
      {
        commentId: 'abc123',
        parentId: null,
        ownerId: '1541062468073593543',
        type: 1,
        fromId: '333333',
        fromNickName: '王五',
        fromAvatar: 'http://avatar.png',
        toId: null,
        toNickName: null,
        toAvatar: null,
        likeNum: 3,
        content: '这个小伙子不错',
        createdTime: '2018-11-15T06:06:10.000+0000',
        updatedTime: '2018-11-15T06:06:10.000+0000',
        childrens: [
          {
            commentId: 'abc456',
            parentId: 'abc123',
            ownerId: '1541062468073593543',
            type: 1,
            fromId: '222222',
            fromNickName: '李四',
            fromAvatar: 'http://222.png',
            toId: 'abc123',
            toNickName: '王五',
            toAvatar: null,
            likeNum: 2,
            content: '这个小伙子不错啊啊啊啊啊',
            createdTime: '2018-11-15T06:08:18.000+0000',
            updatedTime: '2018-11-15T06:36:47.000+0000',
            childrens: []
          }
        ]
      },
      {
        commentId: '1542338522933315867',
        parentId: null,
        ownerId: '1541062468073593543',
        type: 1,
        fromId: '555555',
        fromNickName: '张扬',
        fromAvatar: null,
        toId: null,
        toNickName: null,
        toAvatar: null,
        likeNum: 0,
        content: '你好呀嘿嘿',
        createdTime: '2018-11-16T03:22:03.000+0000',
        updatedTime: '2018-11-16T03:22:03.000+0000',
        childrens: []
      }
      //
    ]
  }
}
// 导出数据
export default data
