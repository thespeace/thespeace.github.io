---
date: '2023-04-12'
title: '[정처기 실기]1-5-1.소프트웨어 구축'
categories: ['정처기 실기']
summary: 'Chapter05.서버 프로그램 구현- Section1.개발 환경 구축'
thumbnail: './Engineer_Information_Processing.png'
---
# Chapter05.서버 프로그램 구현
## Section01. 개발 환경 구축
01. 서버 환경 구축
    1) 웹 서버(Web Server)
       * 클라이언트에게 정적 파일(HTML, CSS, JS, 이미지)을 제공하는 웹서버 애플리케이션이 설치된 하드웨어
       * 이미지, CSS, JS, HTML 문서를 클라이언트에게 전달
       * Apache Web Server, IIS, Nginx, GWS 등
    2) 웹 애플리케이션 서버(WAS)
       * 동적인 웹 서비스를 제공하기 위한 미들웨어가 설치된 하드웨어
       * 클라이언트 요청에 맞는 동적인 콘텐츠를 생성한다.
       * 데이터베이스(DataBase) 조회나 다양한 로직을 처리한다.
       * WebLogic, WebSpere, Jeus, Tomcat 등
    3) 데이터베이스 서버(DBMS)
       * 데이터의 저장과 관리를 위한 데이터베이스 소프트웨어가 설치된 하드웨어
       * Oracle, MySQL, MS-SQL 등
    4) 파일서버
       * 사용자의 파일을 저장하고, 파일을 공유할 목적으로 구성된 하드웨어
    5) Load Balancer
       * 여러 대의 서버가 존재할 경우 요청을 적절히 분배해주는 역할
       * 분배 방식

| 종류           | 설명                                  |
|--------------|-------------------------------------|
| Random       | 요청을 랜덤으로 분배한다.                      |
| Least loaded | 가장 적은 양의 작업을 처리하고 있는 서버에게 요청을 할당한다. |
| Round Robin  | 순서를 정하여 돌아가며 작업 분배한다.               |