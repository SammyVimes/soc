<%--
  Created by IntelliJ IDEA.
  User: Semyon
  Date: 29.03.2015
  Time: 2:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Узнай свою самооценку!</title>
    <meta charset="utf-8">
    <%--<link href="http://xomak.net/soc/css/main.css" rel="stylesheet">--%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/materialize.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css"/>
    <script src="${pageContext.request.contextPath}/js/jquery-1.11.2.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/materialize.js">void(0)</script>
    <script src="${pageContext.request.contextPath}/js/main.js"></script>
    <script type="text/javascript" src="chrome-extension://phfplpepeojlgfgdfgfgfnmgakolcgoa/js/injected.js"></script></head>
<body>
<div class="parent">

    <div class="outer">
        <div class="middle">
            <div class="inner">

                <div class="container">
                    <div id="" class="card-panel z-depth-3">
                        <div id="header">
                            <h2 id="title" class="header">Добро пожаловать!</h2>
                            <div id="progressBar" class="progress">
                                <div id="progressBarContent" class="determinate" style=""></div>
                            </div>
                        </div>
                        <div id="innerContent">
                            <p>Приветственный текст. Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла Бла-бла.</p>
                        </div>
                        <div id="buttonsBlock">
                            <div id="buttonContinue" class="btn waves-effect waves-light z-depth-2">Продолжить</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
<div class="hidden" id="matrixContent">
    <p>Представьте реального человека, который может служить для вас эталоном. Оцените, насколько у него проявляются следующие качества.</p>
    <div class="tooltipBlock column2 card-panel z-depth-1-half">
        <div>0 - качество отстутсвует<br>1 - Качество практически не проявляется<br>2 - Качество проявляется очень слабо</div>
        <div>3 - Качество проявляется слабо<br>4 - Качество довольно выражено (очевидно)<br>5 - Качество выражается очень ярко</div>
    </div>
    <table id="marksTable">
    </table>
</div>

</body>
</html>