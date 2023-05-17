# NextNovel 결제 시스템
---

![kafka_screenshot](./img/kafka.png)
```
PaymentsService
├─core
│  └─src
│      ├─main
│      │  ├─generated
│      │  ├─java
│      │  │  └─com
│      │  │      └─a509
│      │  │          └─common
│      │  │              ├─bootpay
│      │  │              │  ├─dto
│      │  │              │  └─exception
│      │  │              ├─dto
│      │  │              │  ├─order
│      │  │              │  │  ├─request
│      │  │              │  │  └─response
│      │  │              │  ├─orderitem
│      │  │              │  │  ├─request
│      │  │              │  │  └─response
│      │  │              │  └─point
│      │  │              │      ├─request
│      │  │              │      └─response
│      │  │              ├─dummy
│      │  │              ├─enums
│      │  │              └─exception
│      │  │                  ├─dto
│      │  │                  ├─enums
│      │  │                  ├─item
│      │  │                  ├─order
│      │  │                  ├─orderitem
│      │  │                  └─point
│      │  └─resources
│      └─test
│          ├─java
│          └─resources
├─item-service
│  └─src
│      ├─main
│      │  ├─generated
│      │  ├─java
│      │  │  ├─com
│      │  │  │  └─a509
│      │  │  │      ├─controller
│      │  │  │      ├─domain
│      │  │  │      ├─dto
│      │  │  │      ├─dummy
│      │  │  │      ├─enums
│      │  │  │      ├─repostiory
│      │  │  │      └─service
│      │  │  └─org
│      │  └─resources
│      └─test
│          ├─java
│          └─resources
├─order-item-service
│  └─src
│      ├─main
│      │  ├─generated
│      │  ├─java
│      │  │  └─com
│      │  │      └─a509
│      │  │          ├─config
│      │  │          ├─controller
│      │  │          ├─domain
│      │  │          ├─dto
│      │  │          │  ├─request
│      │  │          │  └─response
│      │  │          ├─repository
│      │  │          └─service
│      │  └─resources
│      └─test
│          ├─java
│          └─resources
├─order-service
│  └─src
│      ├─main
│      │  ├─generated
│      │  ├─java
│      │  │  └─com
│      │  │      └─a509
│      │  │          ├─common
│      │  │          │  ├─dummy
│      │  │          │  └─kafka
│      │  │          │      ├─config
│      │  │          │      └─deserializer
│      │  │          ├─controller
│      │  │          ├─domain
│      │  │          ├─dto
│      │  │          │  └─response
│      │  │          ├─repository
│      │  │          └─service
│      │  └─resources
│      └─test
│          ├─java
│          └─resources
└─point-service
    └─src
        ├─main
        │  ├─generated
        │  ├─java
        │  │  └─com
        │  │      └─a509
        │  │          ├─config
        │  │          ├─controller
        │  │          ├─domain
        │  │          │  └─dto
        │  │          │      ├─request
        │  │          │      └─response
        │  │          ├─repository
        │  │          └─service
        │  └─resources
        └─test
            ├─java
            └─resources

``` 

