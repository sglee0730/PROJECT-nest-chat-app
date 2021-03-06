## Microservice chatting Application on NestJS 

NestJS로 개발한 단순한 마이크로서비스 아키텍쳐 채팅 앱입니다.

NestJS와 마이크로 서비스 아키텍쳐에 대해 학습하고자 시작하였습니다. 

## Architecture overview

![chat-app](https://user-images.githubusercontent.com/58541337/108497817-614b3100-72ef-11eb-9b27-1d1b88bbcfef.png)

<ul>
<li>Notification-service

dynamo db와 연동한 알림 서비스입니다. 친구 추가 시 친구 서비스에서 알림을 생성하며 친구 신청을 받은 이용자에게 알림이 생성됩니다.

<li>Scraping-service</li>


채팅 서비스에서 url 입력시 url에 대한 정보를 가져옵니다. open-graph 정보를 수집해오며 open-graph-scraper와 puppeteer를 사용하였습니다.
<li>Chat-service</li>


Socket.io를 사용한 간단한 채팅 앱입니다. Redis를 어댑터 패턴으로 적용하여 Redis의 Pub/sub를 이용할 수 있습니다. 이를 이용함으로 room이 증가하여도 안정적인 운영을 할 수 있습니다.
<li>http App</li>


client와 직접 통신하는 http 서버입니다. 메세지큐인 RabbitMQ를 사용하여 다른 서비스간에 비동기 작업이 용이하게 합니다. Kafka 사용 예정이였으나 추후 kubernetes 실험 운영을 고려해 stateful한 기술인 Kafka대신 rabbitMQ로 대체하였습니다. 

![rabbit](https://user-images.githubusercontent.com/58541337/109134053-fbe8bb80-7798-11eb-845d-811f37bd298f.JPG)

<li>Account-service</li>


계정과 인증에 대한 기본적인 서비스입니다. JWT와 Bcrypt를 이용한 보안방식을 사용하였습니다. 주 저장소는 mySQL이며, redis에는 토큰 정보가 저장되어 인증시에 사용됩니다. 세션 저장소를 이용해 로그인을 유지하며 클라이언트에 auth_token 이름의 토큰이 있을 시 /account/auth로 요청하여 로그인을 생략합니다.
<li>Friend-service</li>


Neo4j 그래프 데이터 베이스를 이용하여 친구 검색, 추가, 삭제, 추천을 구현하였습니다. Neo4J의 쿼리인 cypher를 이용하여 친구 추천을 구현하였습니다. 내 친구 2명 이상이 공통으로 관계를 가지고 있는 노드를 검색하는 방법으로 친구 추천을 구현하였습니다.
<li>Task-service</li>


MongoDB Atlas를 이용한 간단한 task 관리 서비스입니다. task 추가, 삭제, 변경, 조회 기능있습니다.

![mongo](https://user-images.githubusercontent.com/58541337/109133520-6f3dfd80-7798-11eb-8cde-7306158d7021.JPG)

<li>Front-end</li>


React, Ant design, sass로 전체적인 UI와 화면을 구성하였고, 상태 관리에는 recoil을 사용하였습니다.
</ul>

## Account service

<li>가입

```
POST /account/signup

{
    "email": "nest@example.com",
    "password" : "1q2w3e4r",
    "username": "nest"
}
---------result----------
{
    "success": true,
    "message": "User registered successful. ",
    "date": "2021-2-25"
}
```

<li>로그인

![login](https://user-images.githubusercontent.com/58541337/109131088-cf7f7000-7795-11eb-9afb-008ad4fdde1c.gif)
<li>토큰 생성

![token](https://user-images.githubusercontent.com/58541337/109131281-fc338780-7795-11eb-9f33-c86a109608c6.JPG)

## Chat service

<li>채팅

![chat](https://user-images.githubusercontent.com/58541337/109131343-0f465780-7796-11eb-8ce8-7915f7cbd6ab.gif)

## Scraper service

<li>open graph 이미지가 존재하면 바로 이미지 반환

```
POST /scraper

{
    "url": "https://naver.com"
}
---------result----------
{
    "ogTitle": "네이버",
    "ogUrl": "https://www.naver.com/",
    "ogDescription": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    "twitterCard": "summary",
    "twitterUrl": "https://www.naver.com/",
    "twitterDescription": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    "ogImage": {
        "url": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
        "width": null,
        "height": null,
        "type": "png"
    }
}
```

존재하지 않으면 puppeteer에 Headless browser 사용하여 캡쳐후 base64 값 반환

ex)  https://google.com 은 ogImage가 존재하지 않아 chromium 동작 예시

```
---------result----------
{
    "ogTitle": "Google",
    "ogLocale": "ko",
    "charset": "iso-8859-1",
    "requestUrl": "https://google.com",
    "success": true,
    "preview": "iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAAAAXNSR0IArs4c6QAAIABJREFUeJzs3XecFPX9x......."
}
```

![scraper](https://user-images.githubusercontent.com/58541337/109131546-3f8df600-7796-11eb-89f6-a310d0f2cd3e.gif)


## Friend service

<li> neo4j

<li>친구 불러오기

![loadfriend](https://user-images.githubusercontent.com/58541337/109132228-f25e5400-7796-11eb-9aad-fd69bfb8de32.gif)

<li>유저 찾기

```
POST /friend/search

{
    "username": "apple"
}
---------result----------
{
    "success": true,
    "result": [
        {
            "email": "apple@example.com",
            "username": "apple"
        }
    ]
}
```

<li>친구 추천

![fl](https://user-images.githubusercontent.com/58541337/109133422-56cde300-7798-11eb-9c2c-0231fb2e0007.JPG)

ex) 나와 관계를 가진 노드들 중 2 이상 관계를 가진 노드 fox, yarn을 반환

```
POST /friend/recommendation
{
    "email": "apple@example.com"
}
---------result----------
{
    "success": true,
    "result": [
        {
            "email": "yarn@example.com",
            "username": "yarn"
        },
        {
            "email": "fox@example.com",
            "username": "fox"
        }
    ]
}
```

## Task service

<li> task 스캔

```
GET /task/scan
{
    "email": "apple@example.com"
}
---------result----------
[
    {
        "_id": "603764a88b5fa357c444469c",
        "username": "apple",
        "email": "apple@example.com",
        "description": "쿠버네티스 공부하기!!",
        "date": "2021-02-25T08:49:44.503Z",
        "__v": 0
    },
    {
        "_id": "603764cd8b5fa357c444469d",
        "username": "apple",
        "email": "apple@example.com",
        "description": "Golang으로 유튜브 스팸 코멘트 제거하기 만들기",
        "date": "2021-02-25T08:50:21.328Z",
        "__v": 0
    },
    {
        "_id": "603764de8b5fa357c444469e",
        "username": "apple",
        "email": "apple@example.com",
        "description": "AWS solutions architect 따기",
        "date": "2021-02-25T08:50:38.226Z",
        "__v": 0
    },
    {
        "_id": "603765498b5fa357c444469f",
        "username": "apple",
        "email": "apple@example.com",
        "description": "C++로 leetcode 정복!!",
        "date": "2021-02-25T08:52:25.334Z",
        "__v": 0
    }
]

```

<li> task 수정

![task_add](https://user-images.githubusercontent.com/58541337/109138951-4a4c8900-779e-11eb-810a-1b5cae22bf67.gif)

<li> task 추가 삭제

![task_edit](https://user-images.githubusercontent.com/58541337/109138928-3f91f400-779e-11eb-8dd8-40bdef726475.gif)

## deploy

클라우드 상의 쿠버네티스를 이용하여 배포
 - [x] 개인 도커 레지스트리 구축
 - [x] 네이버 클라우드 플랫폼의 무료 쿠폰 이용하여서 쿠버네티스 클러스터 구성
 - [ ] Elastic Stack, FluentD를 이용한 로깅
