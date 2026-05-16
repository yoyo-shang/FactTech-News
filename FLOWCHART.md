# Fact Tech News - Flowchart, Use Case Diagram, and DFD Level 0

This document contains the main system diagrams for **Fact Tech News**, a web-based technology and gaming news platform developed using **HTML, CSS, and JavaScript**. The diagrams describe how users access content, how the admin manages the platform, and how data flows through the system.

## 1. System Flowchart

```mermaid
flowchart TD
    A([Start]) --> B["Problem: Tech and gaming information is scattered across many platforms"]
    B --> C["Solution: Fact Tech News centralized web platform"]

    subgraph DEV["Development Layer"]
        C --> D["HTML: Page structure and semantic content"]
        C --> E["CSS: Modern UI, responsive layout, visual design"]
        C --> F["JavaScript: Interactivity, quiz, navigation behavior"]
    end

    subgraph UX["User Access and Navigation"]
        D --> G["Responsive website loads on mobile, tablet, and desktop"]
        E --> G
        F --> G
        G --> H{"User selects a section"}
        H --> I["Gaming Updates"]
        H --> J["AI News"]
        H --> K["Graphics Cards"]
        H --> L["Tech Guides"]
        H --> M["Trending Section"]
        H --> N["Interactive Quiz"]
    end

    subgraph CONTENT["Content Delivery"]
        I --> O["Categorized articles"]
        J --> O
        K --> O
        L --> O
        M --> P["Popular and recent content"]
        N --> Q["Quiz questions, score, and feedback"]
        O --> R["Structured headings, visuals, and formatted layouts"]
        P --> R
        Q --> S["Higher user engagement"]
        R --> S
    end

    subgraph SEO["SEO and Monitoring"]
        S --> T["SEO implementation"]
        T --> U["Keyword optimization"]
        T --> V["Meta tags"]
        T --> W["Proper content hierarchy"]
        T --> X["Structured data"]
        U --> Y["Google Search Console"]
        V --> Y
        W --> Y
        X --> Y
        Y --> Z["Monitor impressions, clicks, ranking, and user behavior"]
    end

    subgraph TEST["Testing and Optimization"]
        Z --> AA["Performance optimization"]
        AA --> AB["Fast loading speed"]
        AA --> AC["Clean design"]
        AA --> AD["Minimal errors"]
        AB --> AE{"All sections working correctly?"}
        AC --> AE
        AD --> AE
        AE -- "No" --> AF["Fix layout, content, SEO, or functionality issue"]
        AF --> AA
        AE -- "Yes" --> AG["Smooth and reliable user experience"]
    end

    AG --> AH["Final Outcome: Simple, efficient, scalable tech information platform"]
    AH --> AI["Technical and academic value: Web development, SEO, content management, UI/UX"]
    AI --> AJ([End])

    classDef startEnd fill:#101828,stroke:#475467,color:#ffffff,stroke-width:2px;
    classDef problem fill:#fff1f3,stroke:#c01048,color:#7a0930,stroke-width:1px;
    classDef solution fill:#ecfdf3,stroke:#039855,color:#05603a,stroke-width:1px;
    classDef process fill:#eff8ff,stroke:#1570ef,color:#1849a9,stroke-width:1px;
    classDef decision fill:#fffaeb,stroke:#dc6803,color:#93370d,stroke-width:1px;
    classDef outcome fill:#f4f3ff,stroke:#7a5af8,color:#42307d,stroke-width:1px;

    class A,AJ startEnd;
    class B problem;
    class C,AH,AI solution;
    class D,E,F,G,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AF,AG process;
    class H,AE decision;
```

## 2. Use Case Diagram

This simple use case diagram shows the main actions performed by the **User** and the **Admin**.

```plantuml
@startuml
left to right direction

actor User
actor Admin

rectangle "Fact Tech News System" {
  usecase "Browse Categories" as UC1
  usecase "Read Articles" as UC2
  usecase "Search Content" as UC3
  usecase "Take Quiz" as UC4
  usecase "View Trending" as UC5

  usecase "Manage Content" as UC6
  usecase "Manage Categories" as UC7
  usecase "Manage Quiz" as UC8
  usecase "Update SEO" as UC9
  usecase "Test and Deploy" as UC10
}

User --> UC1
User --> UC2
User --> UC3
User --> UC4
User --> UC5

Admin --> UC6
Admin --> UC7
Admin --> UC8
Admin --> UC9
Admin --> UC10

@enduml
```

## 3. DFD Level 0

This simple DFD Level 0 diagram shows the main data flow between the user, the website system, and the tech content data store.

```plantuml
@startuml
left to right direction
skinparam defaultTextAlignment center
skinparam rectangle {
  BackgroundColor #d9f0f7
  BorderColor #333333
}
skinparam database {
  BackgroundColor #fff8dc
  BorderColor #333333
}

rectangle "User" as User
circle "<b>0</b>\n\n<b>Fact Tech News</b>\n<b>System</b>\n " as System #eef7d8
database "D1\nTech Content" as Content

User --> System : Request Content
System --> User : Display Content

System --> Content : Fetch Data
Content --> System : Provide Data

@enduml
```

## 4. Sequence Diagram

This sequence diagram shows how the user and admin interact with the Fact Tech News system.

```plantuml
@startuml
actor User
actor Admin
participant "Fact Tech News System" as System
database "Tech Content" as Content

User -> System : Open website
System -> Content : Fetch latest content
Content --> System : Return articles and categories
System --> User : Display home page

User -> System : Select category / search / take quiz
System -> Content : Fetch requested data
Content --> System : Return matching content
System --> User : Display result

Admin -> System : Update content / SEO / quiz
System -> Content : Save changes
Content --> System : Confirm update
System --> Admin : Show update status
@enduml
```

## 5. Activity Diagram

This activity diagram shows the main working flow of the Fact Tech News platform.

```plantuml
@startuml
start

:User opens Fact Tech News website;
:System loads responsive interface;

if (User selects action?) then (Browse category)
  :Show selected category articles;
elseif (Search content)
  :Display matching articles;
elseif (Take quiz)
  :Show quiz questions;
  :Calculate and display result;
else (View trending)
  :Show trending content;
endif

:User reads structured tech content;
:System improves engagement through navigation and quiz;

if (Admin update required?) then (Yes)
  :Admin updates articles, categories, quiz, or SEO;
  :System saves updated content;
else (No)
  :Continue normal browsing;
endif

:Test website functionality and performance;
:Deliver reliable technology news platform;

stop
@enduml
```

## 6. System Flow Diagram

This system flow diagram shows the overall movement of requests, processing, stored data, and output in the Fact Tech News platform.

```plantuml
@startuml
left to right direction

actor User
actor Admin

rectangle "Fact Tech News Website" as Website
database "Content Store" as Content
database "Quiz Store" as Quiz
database "SEO Store" as SEO

User --> Website : Open website\nBrowse / search / quiz
Admin --> Website : Manage content\nUpdate SEO / quiz

Website --> Content : Get articles\nand categories
Website --> Quiz : Get quiz questions\nsave result
Website --> SEO : Read sitemap\nand metadata

Content --> Website : Article data
Quiz --> Website : Quiz data
SEO --> Website : SEO data

Website --> User : Display content\ntrending / quiz result
Website --> Admin : Show update status

@enduml
```

## 7. System Module Diagram

```mermaid
flowchart LR
    A[Fact Tech News Platform] --> B[Frontend Development]
    A --> C[Content Management]
    A --> D[User Engagement]
    A --> E[SEO and Analytics]
    A --> F[Testing and Optimization]

    B --> B1[HTML]
    B --> B2[CSS]
    B --> B3[JavaScript]
    B --> B4[Responsive Layout]

    C --> C1[Gaming]
    C --> C2[AI News]
    C --> C3[Graphics Cards]
    C --> C4[Tech Guides]
    C --> C5[Images and Article Layouts]

    D --> D1[Quiz]
    D --> D2[Trending Content]
    D --> D3[Easy Navigation]

    E --> E1[Meta Tags]
    E --> E2[Keyword Optimization]
    E --> E3[Structured Data]
    E --> E4[Google Search Console]

    F --> F1[Mobile Testing]
    F --> F2[Tablet Testing]
    F --> F3[Desktop Testing]
    F --> F4[Speed and Error Checks]
```
