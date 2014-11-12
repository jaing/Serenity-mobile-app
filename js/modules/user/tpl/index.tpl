<header id="app-header">
    <div class="row-fluid">
        <div class="span2">
            <a href="#" id="show-aside-menu">
                <i class="fa fa-bars"></i>
            </a>
        </div>
        <div class="span8 text-center">
            <h1 class="title">{{=title}}</h1>
        </div>
        <div class="span2 text-right">
            <a href="#" class="basket">
                <i class="fa fa-shopping-cart"></i>
                <span class="badge">0</span>
            </a>
        </div>
    </div>
</header>
<div id="app-body" class="page">

    <div class="wrapper">
        <div id="app-sidebar" class="clearfix">

            <div class="user-panel">
                <div class="bg-p"></div>
                <div class="photo">
                    {{ if (user.avatar) { }}
                        <img src="{{=user.avatar}}" alt=""/>
                    {{ } else { }}
                        <img src="images/add_user.jpg" alt=""/>
                    {{}}}
                </div>
                <div class="data">
                    {{ if (user) { }}
                        <div class="name">{{=user.firstName}} {{=user.lastName}}</div>
                        <div class="saldo"><span data-translate="label.global.layality"></span> {{=user.loyalty.points}} <span data-translate="label.global.points"></span></div>
                        <div class="social">
                            <i class="fa fa-facebook-square "></i>
                            <i class="fa fa-twitter-square "></i>
                        </div>
                    {{ } }}
                </div>
            </div>

        </div>
        <div id="app-main">

            <nav class="categories element-container">

            </nav>
            <div class="products-container">

            </div>

        </div>
    </div>
</div>
<aside id="app-aside" class="page">

</aside>
<section id="basket">
    <div class="element-container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere labore, magnam maiores nam quas quod. Atque aut deserunt eligendi in ipsam iure odit quis tenetur! Dolores iusto libero porro repudiandae.
    </div>
</section>