'use strict';

/*
89. An High-Level Overview of JavaScript
1. 자바스크립트의 특징들
1) High-level
- CPU, memory와 같은 컴퓨터 자원들을 신경쓸 필요가 없어 코드를 쓰기 쉽다.
- 하지만 low-level 언어처럼 빨라지거나 최적화될 수가 없다.
- low-level: CPU, memory와 같은 컴퓨터 자원들을 신경써야 한다. 예를 들어 C언어가 memory에 변수를 만들라고 명령하는 것 등

2) Garbade-collected
- js engine에 있는 알고리즘이 오래된, 사용하지 않는 object들을 청소해준다.
- 개발자가 직접 메모리 관리할 필요가 없다.

3) Interpreted or just-in-time compiled
- compiling, interpreting: 사람이 쓴 코드를, 컴퓨터 프로세스가 이해할 수 있는 0과 1로 이루어진 기계어로 변환하는 작업.
- js에서는 위 과정이 js engine에서 일어난다.

4) Multi-paradigm
- Paradigm: 코드를 쓸 때, 코딩 스타일이나 기술을 결정하는 접근법이나 마음가짐
- Paradigm 종류
  - Procedural programming
  - Object-oriented programming (OOP)
  - Functional programming (FP)
- Paradigm은 Imperative, Declarative로 나뉜다.
- js는 세 패러다임을 모두 사용할 수 있다.

5) Prototyped-based object-oriented
- js의 대부분은 객체로 이루어져있다. (primitive type 제외)
- ex) Array는 객체인데, .push() 등의 메서드를 가진 Prototype을 청사진삼아 우리는 Array를 생성하게 된다.
  - 우리가 만든 Array에서 메서드를 사용할 수 있는 이유는, Prototype의 메서드를 상속받기 때문에
  
6) First-class functions
- 함수를 일반 변수처럼 사용할 수 있다. 함수를 다른 함수의 Argument로 넣거나, return값으로 줄 수 있다.
- 모든 언어에 있는 것은 아니지만 js에는 있음

7) Dynamic
- 변수에 타입을 지정해서 선언하지 않으므로, 한 변수의 타입이 dynamic하게 바뀔 수 있다.
- 오류를 발생시키기도 한다.
- TypeScript: 타입을 지정하는 js

8) Single-threaded, Non-blocking event loop
- Concurrency model: js engine이 동시에 일어나는 여러 일들을 처리하는 방식
- Single thread: js는 한 번에 한 일만 수행할 수 있다.
- 오랜 시간이 걸리는 일은 Single thread를 block할 수 있기 때문에 event Loop를 사용
- event loop: 오랜 시간이 걸리는 일을 background에서 실행하고, 끝나면 main thread로 다시 옮겨온다.



90. The JavaScript Engine and Runtime
1. js engine이란?
- js code를 실행하는 프로그램
- 브라우저마다 다른 Js engine이 있다.
  - 대표적으로 google의 V8 Engine. 덕분에 chrome과 node.js가 많이 사용된다.
  - node.js: js runtime. 브라우저 밖에서 server-side app을 만들 수 있다.
- 구조
  - call stack: execution context를 이용해 코드를 실행하는 곳.
  - heap: 비구조적인 메모리 풀. app에 필요한 객체들이 모두 모여있다.

2. Compilation vs Interpretation
- Compilation
  - 소스 코드 전체를 한번에 기계어로 번역한다.  0과 1로 된, 이동 가능하며 어떤 컴퓨터에서도 실행 가능한 파일이 만들어진다.
  - 컴파일 직후 실행할 필요가 없다.
- Interpretation
  - 소스 코드를 한줄한줄 기계어로 변환하면서 실행을 동시에 한다.
  - js가 여기에 해당했었다.
  - compiling 언어보다 실행 속도가 매우 느리다.
- Just-in-time(JIT) compilation
  - 모던 js에서, 실행 속도를 빠르게 하기 위해서 도입한 방식
  - 소스 코드 전체를 한번에 기계어로 번역하고, 즉시 실행한다. 별도의 파일이 만들어지지 않는다.

3. 모던 js에서 Just-in-time(JIT) compilation
- 1) 코드가 js engine으로 들어온다.
- 2) parsing
  - 코드를 읽고 AST(abstract syntax tree)라는 자료구조로 변환한다.
  - 의미 단위로 js 코드를 쪼갠 후, AST에 구조적으로 정리한다.
  - 이때 syntax error를 체크한다.
  - 만들어진 AST는 기계어로 변환할 때 이용된다.
  - AST가 어떻게 생겼는지 알 필요는 없다.
  - AST는 DOM tree와 아무 관련이 없다.
- 3) compilation
  - AST를 기계어로 변환한다.
- 4) Execution
  - 컴파일 후, 바로 기계어를 실행한다.
  - call stack 내에서 일어난다.
- 5) optimization
  - 최대한 빨리 실행시키기 위해 unoptimized code로 먼저 실행한다.
  - 실행하는 동안, 코드를 최적화하고 재컴파일하는 과정을 반복한다.
  - 각각의 과정동안 코드는 계속 덮어씌워진다.
  - 이 과정 덕분에 V8같은 modern engine이 빠른 것.
- 이 모든 과정들은 코드를 실행하는 메인 스레드와 완전히 분리된 특별한 스레드에서 진행된다.
  - 코드에서 이 스레드에 접근할 수 없다.

4. JavaScript Runtime in browser
- js engine
  - js runtime의 핵심
- WEB API
  - DOM, Timer, Fetch API 등의 기능을 엔진에 제공함.
  - js 언어만의 것은 아니다. js는 window 객체를 통해서 WEB API에 접근할 수 있다.
- Callback queue
  - 실행할 준비를 하고있는 콜백함수들을 담은 queue
  - Event Handler는 콜백 함수이다.
    - 이벤트가 일어나면, 함수는 callback queue에 들어간다.
    - call stack이 비어있으면, 함수가 들어가 실행된다. 
    - Event loop: callback queue에 있는 함수를 call stack에 옮겨주는 것
      - 앞에서 배운, js에서 Concurrency model을 구현하는 데 중요

5. JavaScript Runtime in node.js
- 4. JavaScript Runtime in browser와 비슷하지만, 브라우저가 없기 때문에 WEB API가 없다.
- WEB API 대신 여러가지 C++ binding(= thread pool)이 있다.



91. Execution Contexts and The Call Stack
- compile 후, 코드가 실행(execute)되는 과정
  1. global execution context(top-level code) 생성
    -  코드들만 포함된다.
    - 함수 내 코드를 제외한, 변수 선언과 함수 선언이 포함된다.
    - 함수 내 코드는 call 되어야만 실행된다.
    - 코드가 실행되기 위해 필요한 모든 정보를 가지고 있다.
    - 처음에는 함수를 제외한 코드를 위한 global execution context가 생성된다.
    - global execution context는 코드가 얼마나 길든 반드시 하나 존재
  2. top-level code가 global execution context에서 실행됨
    - execution context
      - 자바스크립트가 execution context 안에서 실행된다.
  3. 함수 실행
    - CPU Processer가 위 실행을 끝내면 시작됨
    - 함수 또는 메서드가 하나 실행될 때마다, 그 함수를 실행하기 위한 정보를 담은 새로운 execution context가 생성된다.
      - 함수는 그 자신만의 execution context를 가진다.
  4. 엔진이 콜백이 도착하기를 대기
    - 함수가 모두 실행되고나면 이벤트, 콜백을 대기한다.
- execution context 상세
  - execution context 안에는 무엇이 있을까?
    1. Variable Environment
      - let, const, var 선언
      - 선언한 함수들
      - arguments objects: 함수들의 argument들을 저장
    2. Scope chain
      - 함수는 그 자신만의 execution context를 가지기 때문에, 그 안에 또 자신만의 변수들이 저장된다.
      - 함수는 Scope chain을 참조로 하여, 바깥의 변수에도 접근할 수 있다.
      - Scope chain은 각각의 execution context 안에 존재한다.
    3. this keyword
      - 각각의 execution context 안에 존재한다.
    - 위 1, 2, 3은 코드 실행 직전의 creation phase에서 생성된다.
    - arrow function의 execution context는 argument object, this keyword를 가지지 않는다.
      - 자신과 가장 가까운 부모 regular function을 이용해서 이들을 사용한다.
- Call stack
  - execution의 순서를 tracking할 수 있게 한다. (지도처럼)
  - Call stack의 가장 위에 있는 execution context가 실행중이다.
  - context가 위에 쌓이면서 실행되며, 아래에 있던 것은 멈춘다.
    - js가 single-thread이기 때문에 동시에 실행될 수는 없다.
  - 함수가 return되면 그 context는 stack에서 pop되며, 메모리에서 사라진다.
  - 모든 execution이 끝나면, call stack에 global execution context만 남아있다.
  - 브라우저가 꺼지거나 하여 완전히 finish되면 call stack이 비워진다.


  
92. Scope and The Scope Chain



*/
