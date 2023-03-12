---
date: '2023-03-12'
title: '[Sqld]3장.SQL 기본'
categories: ['Sqld']
summary: 'SQL 기본'
thumbnail: './sqld3.png'
---

## 01. ``관계형 DB 개요``
1. DB : 데이터를 일정한 형태로 저장해 놓은 것, DBMS를 이용하여 효율적인 데이터 관리와 데이터 손상 복구 가능
   * 종류
     - 계층형 DB : 트리 형태의 자료구조에 데이터 저장, 1:N 관계 표현
     - 네트워크형 DB : 오너와 멤버 형태로 데이터 저장, M:N 관계 표현
     - 관계형 DB : 릴레이션에 데이터 저장, 집합 연산과 관계 연산 가능
2. ``관계형 DB``(RDB : Relational Database) : 1) 정규화를 통해 이상현상 및 중복 데이터 제거 2) 동시성 관리와 병행 제어를 통해 데이터 동시 조작 가능
   * 집합 연산
     - 합집합(Union)
     - 차집합(Difference)
     - 교집합(Intersection)
     - 곱집합(Cartesian Product): 각 릴레이션에 존재하는 모든 데이터를 조합
   * 관계 연산
     - ``선택 연산``(Selection): 조건에 맞는 행(튜플) 조회
     - ``투영 연산``(Projection): 조건에 맞는 칼럼(속성) 조회
     - 결합 연산(Join): 공통 속성을 사용하여 새로운 릴레이션 생성
     - 나누기 연산(Division): 공통요소를 추출하고 분모 릴레이션의 속성을 삭제한 후 중복된 행 제거
3. ``SQL``(Structured Query Language): RDB에서 사용하는 언어, 데이터 조회 및 신규 데이터 입력/수정/삭제 기능 제공
   * 종류
     - ``DML``(Data Manipulation Language, 데이터 조작어) - ISUD
       + SELECT: 데이터 조회 명령어
       + INSERT, UPDATE, DELETE: 데이터 변형 명령어
     - ``DDL``(Data Definition Language, 데이터 정의어): 데이터 구조 관련 명령어 - CA_D
       + CREATE, ALTER DROP
     - ``DCL``(Data Control Language, 데이터 제어어): DB 접근 권한 부여 및 회수 명령어
       + GRANT, REVOKE
     - ``TCL``(Transaction Control Language, 트랜잭션 제어어): DML로 조작한 결과를 논리적인 작업단위 별로 제어
       + COMMIT, ROLLBACK
4. ``테이블(Table)``: RDB의 기본 단위, 데이터를 저장하는 객체, 칼럼과 행의 2차원 구조
## 02. ``DDL``
1. 데이터 타입 (앞은 Oracle 뒤는 SQL Server) 
   * CHAR(L) : 고정 길이 문자열, 할당된 변수 값의 길이가 L 이하일 때 차이는 공백으로 채워진다
   * VARCHAR2(L), VARCHAR(L) : 가변 길이 문자열, 할당되는 변수 값의 길이의 최대값이 L임, 문자열은 가능한 최대 길이로 설정
   * NUMBER(L,D) : 숫자형 (L은 전체 자리 수 D는 소수점 자리 수)
     - SQL Server은 NUMERIC DECIMAL FLOAT REAL 등
   * DATE, DATETIME : 날짜형, 데이터 크기 지정이 필요하지 않다
2. ``**CREATE TABLE**`` 
    ```sql
    CREATE TABLE 테이블명 (칼럼명 데이터타입 제약조건, …);
    ```
   * 테이블 및 칼럼 명명 규칙
     - 1)알파벳 2)숫자 3)‘_’(언더바) 4)‘$’(달러) 5)‘#’(샵) 사용
     - 대소문자 구분하지 않는다
     - 테이블명은 단수형 권고
   * 제약조건: 데이터 무결성 유지가 목적, 복제 테이블에는 기존 테이블 제약조건 중 NOT NULL만 적용 
     - ``PRIMARY KEY`` : 테이블 당 하나의 기본키만 정의 가능, 기본키 생성시 DBMS가 자동으로 인덱스를 생성함,
       NULL 불가
     - ``FOREIGN KEY`` : 으로 다른 테이블의 기본키를 외래키로 지정, 참조 무결성 제약조건
       ```sql
       ALTER TABLE 테이블명 ADD CONSTRAINT 칼럼명 FOREIGN KEY (칼럼명) REFERENCES 테이블명(칼럼명);
       ```
     - ``UNIQUE KEY`` : 행 데이터를 식별하기 위해 생성함, NULL 가능
     - ``DEFAULT`` : ‘DEFAULT 값’으로 기본값 설정
     - ``NOT NULL``
       + NULL: 아직 정의되지 않은 값 또는 현재 데이터를 입력하지 못하는 값, NULL과의 1) 수치연산은 NULL 2) 비교연산은 FALSE 출력
     - ``CHECK`` : 입력값의 종류 및 범위 제한
   * DESCRIBE 테이블명, sp_help ‘dbo.테이블명’ : 테이블 구조 확인, ‘DESCRIBE 테이블명’이 ANSI/ISO 표준
3. ``**ALTER TABLE**``: 테이블의 칼럼 관련 변경 명령어
   * 컬럼 추가 
     ```sql
     ALTER TABLE 테이블명 ADD (칼럼명 데이터타입);
     ```
     - 마지막 칼럼으로 추가됨 (칼럼 위치 지정 불가) 
   * 칼럼 삭제 
     ```sql
     ALTER TABLE 테이블명 DROP COLUMN 칼럼명;
     ```
     - 삭제 후 복구 불가
   * 칼럼 설정 변경 
     ```sql
     ALTER TABLE 테이블명 MODIFY (칼럼명 데이터타입 제약조건);
     ```
     - 1)NULL만 있거나 2)행이 없는 경우에만 칼럼의 크기 축소 가능
     - NULL만 있을 때는 데이터 유형도 변경 가능
     - NULL이 없으면 NOT NULL 제약조건 추가 가능
     - 기본값 변경 작업 이후 발생하는 데이터에 대해서만 기본값이 변경된다
   * 칼럼명 변경
     ```sql
     ALTER TABLE 테이블명 RENAME COLUMN 칼럼명;
     ```
     - ANSI/ISO 표준에 명시된 기능은 아니다
   * 제약조건 추가
     ```sql
     ALTER TABLE 테이블명 ADD CONSTRAINT 제약조건;
     ```
   * 제약조건 제거
     ```sql
     ALTER TABLE 테이블명 DROP CONSTRAINT 제약조건;
     ```
4. RENAME TABLE
   ```sql
   RENAME 테이블명 TO 테이블명; (ANSI/ISO 표준)
   ```
   - ‘ALTER TABLE 테이블명 RENAME TO 테이블명’으로도 가능하다
5. DROP TABLE
   ```sql
   DROP TABLE 테이블명;
   ```
   * 테이블의 데이터와 구조 삭제, 복구 불가
   * CASCADE CONSTRAINT 옵션으로 관련 테이블의 참조 제약조건도 삭제하여 참조 무결성을 준수할 수 있다
     (CREATE TABLE에서 ON DELETE CASCADE 옵션으로도 동일 기능 실현 가능) 
6. TRUNCATE TABLE
   ```sql
   TRUNCATE TABLE 테이블명;
   ```
   - 테이블의 전체 데이터 삭제 (↔ DROP TABLE은 테이블 자체를 제거한다)
   - 로그를 기록하지 않기 때문에 ROLLBACK 불가
## 03. DML
1. INSERT: 데이터 입력
   ```sql
    INSERT INTO 테이블명 (칼럼명, …) VALUES (필드값, …); 
    INSERT INTO 테이블명 VALUES (필드값, …);
   ```
2. UPDATE: 데이터 수정
   ```sql
    UPDATE 테이블명 SET 칼럼명=필드값;
   ```
3. DELETE: 데이터 삭제
   ```sql
    DELETE FROM 테이블명 WHERE 조건절; 
    DELETE FROM 테이블명;
   ```
   * ``DELETE로 데이터를 삭제해도 테이블 용량은 초기화되지 않는다`` (↔ ``TRUNCATE로 삭제하면 초기화 가능``)
   * ↔ DROP은 객체 삭제 명령어 
4. SELECT
   *  칼럼 별 데이터 선택
      ```sql
      SELECT 칼럼명 FROM 테이블명;
      ```
   *  데이터 중복 없이 선택
      ```sql
      SELECT DISTINCT 칼럼명 FROM 테이블명;
      ```
   *  전체 칼럼의 데이터 선택
      ```sql
      SELECT * FROM 테이블명; 
      ```
      - 앨리어스(Alias)
        + SELECT 칼럼명 AS “별명” : 출력되는 칼럼명 설정
        + FROM 테이블명 별명 : 쿼리 내에서 사용할 테이블명 설정, 칼럼명이 중복될 경우 SELECT절에서 앨리어스 필수
5. ``문자열의 합성 연산자``: ``‘+’(플러스)``, ``CONCAT 함수``로도 2개 문자열 합성 가능, Oracle에서는 ‘||’(수직선 2개)도 가능
6. DUAL : Oracle의 기본 더미 테이블, 연산 수행을 위해 사용된다
## 04. TCL