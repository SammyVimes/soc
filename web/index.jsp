<%--
  Created by IntelliJ IDEA.
  User: Semyon
  Date: 26.03.2015
  Time: 21:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/materialize.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.min.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.structure.css"/>
    <script src="${pageContext.request.contextPath}/js/jquery-1.11.2.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/jquery-ui.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/materialize.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/poll.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/login.js">void(0)</script>
</head>
<body>

<script>
    $(function() {
        var poller = null;
        function loginListener(key, data) {
            poller = new Poller(key, data);
        }
        function errorListener(error) {
            alert("Error: " + error);
            window.location.hash = "";
            setTimeout(function() {
                login(loginListener); //hehe
            }, 1000);
        }
        login(loginListener, errorListener);
        $("#finish").click(function() {
            poller.sendData();
        });
    });
</script>

<div class="section" id="index-banner">
    <div class="container">
        <div class="row">
            <div class="col s12 m9">
                <h1 class="header center-on-small-only">Генератор групп</h1>
                <h4 class="light red-text text-lighten-4 center-on-small-only">Узнайте, кто вам подходит, с помощью силы социологии!</h4>
                <h5 id="your-name" class="light red-text text-lighten-4 center-on-small-only"></h5>
            </div>
        </div>
    </div>
</div>

<div class="container main-container">
    <div class="row tab-row">
        <div class="col s12 m9 l10">
            <div class="col s12">
                <ul class="tabs z-depth-1">
                    <li class="tab col s3"><a class="active" href="#poll_tab">Опрос</a></li>
                    <li class="tab col s3"><a href="#people_tab">Люди</a></li>
                </ul>
            </div>
            <div id="poll_tab" class="col s12">
                <div id="polls" class="section">

                </div>
                <div class="col s12 m4 l12 center">
                    <button class="center btn waves-effect waves-light red lighten-3" onclick=" $('ul.tabs').tabs('select_tab', 'people_tab');">Дальше</button>
                </div>
            </div>
            <div id="people_tab" class="col s12">
                <div id="linear" class="section">
                    <h2 class="header">Люди</h2>
                    <div id="people"></div>
                </div>
                <div class="col s12 m4 l12 center">
                    <button class="center btn waves-effect waves-light red lighten-3" id="finish">Завершить</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="login-modal" class="modal">
    <div class="modal-content">
        <h4>Введите ключ</h4>
        <div class="row">
            <div class="input-field col s12">
                <input id="key" type="text" class="validate">
                <label for="key">Ключ</label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="login-modal-ok" class="waves-effect waves-green btn-flat modal-action">OK</button>
    </div>
</div>

<div id="info-modal" class="modal">
    <div class="modal-content">
        <h4>Информация</h4>
        <div class="row">
            <span id="info"></span>
        </div>
    </div>
    <div class="modal-footer">
        <button class="waves-effect waves-green btn-flat modal-action modal-close" onclick="$('#info-modal').closeModal()">OK</button>
    </div>
</div>


<div id="progress-modal" class="modal">
    <div class="modal-content">
        <h4>Подождите</h4>
        <div class="col s12 m4 l12 center">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>

                <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="template" id="poll-template">
    <div class="poll">
        <input class="hidden poll-id"/>
        <div class="section scrollspy">
            <h4 class="header poll-header" poll-header></h4>
            <div class="lists">

            </div>
        </div>
    </div>
</div>

<div class="template" id="list-template">
    <div class="poll-list">
        <input class="hidden list-id"/>
        <div class="card-panel grey lighten-4">
            <h5 class="blue-text header list-header" list-header></h5>
            <span class="list-description" list-description></span>
            <div class="items">

            </div>
        </div>
    </div>
</div>

<div class="template" id="list-item-template">
    <div class="list-item row">
        <div class="col s12 m12">
            <div class="card-panel lighten-5 z-depth-1 waves-effect waves-blue">
                <input class="hidden item-id"/>
                <span class="list-item-title"></span>
                <span class="list-item-description"></span>
            </div>
        </div>
    </div>
</div>


<footer class="page-footer">
    <div class="container">
        <div class="row">
            <div class="col l4 s12">
                <h5 class="white-text">Вконтакте</h5>
                <a class="btn waves-effect waves-light red lighten-3" target="_blank" href="https://vk.com/eltechweb">Перейти в группу</a>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">© 2015 Eltech, All rights reserved.</div>
    </div>
</footer>

</body>
</html>