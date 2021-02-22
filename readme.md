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
<li>Account-service</li>


계정과 인증에 대한 기본적인 서비스입니다. JWT와 Bcrypt를 이용한 보안방식을 사용하였습니다. 주 저장소는 mySQL이며, redis에는 토큰 정보가 저장되어 인증시에 사용됩니다. 세션 저장소를 이용해 로그인을 유지하며 클라이언트에 auth_token 이름의 토큰이 있을 시 /account/auth로 요청하여 로그인을 생략합니다.
<li>Friend-service</li>


Neo4j 그래프 데이터 베이스를 이용하여 친구 검색, 추가, 삭제, 추천을 구현하였습니다. Neo4J의 쿼리인 cypher를 이용하여 친구 추천을 구현하였습니다. 내 친구 2명 이상이 공통으로 관계를 가지고 있는 노드를 검색하는 방법으로 친구 추천을 구현하였습니다.
<li>Task-service</li>


MongoDB Atlas를 이용한 간단한 task 관리 서비스입니다. task 추가, 삭제, 변경, 조회 기능있습니다.
<li>Front-end</li>


React, Ant design, sass로 전체적인 UI와 화면을 구성하였고, 상태 관리에는 recoil을 사용하였습니다.
</ul>

## Update

클라우드 상의 쿠버네티스를 이용하여 배포
 - [ ] 개인 도커 레지스트리 구축
 - [ ] 네이버 클라우드 플랫폼의 무료 쿠폰 이용하여서 쿠버네티스 클러스터 구성
 - [ ] Elasticsearch, FluentD, Kibana를 이용한 로깅과 시각화
 - [ ]프로메태우스, Grafana 혹은 Datadog을 사용하여 쿠버네티스와 다른 서비스 모니터링
 - [ ] Jmeter, Naver Pinpoint 사용하여 스트레스 테스트
