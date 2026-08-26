
# ☁️ Open-Meteo Rest API

Projeto desenvolvido com **Spring Boot** que consome a **API do Open-Meteo** para obter informações meteorológicas. A aplicação disponibiliza uma API REST que permite consultar informações meteorológicas de uma cidade, utilizando a API de geocodificação do Open-Meteo para localizar a cidade e, posteriormente, obter os dados meteorológicos correspondentes.

---

## 🛠 Tecnologias

- Java 25
- Spring Boot
- Maven
- REST API
- RestTemplate
- Open-Meteo API

---

## 🌐 API Utilizada

Este projeto utiliza a API gratuita do **Open-Meteo**:

- https://open-meteo.com/

São utilizadas principalmente duas APIs:

### 📍 Geocoding API

Responsável por localizar uma cidade e obter suas coordenadas geográficas.

Endpoint:

- https://geocoding-api.open-meteo.com/v1/search

Exemplo:

- https://geocoding-api.open-meteo.com/v1/search?name=belo-horizonte&count=1&language=pt&format=json

### ☁️ Weather API

Utilizada para consultar os dados meteorológicos através das coordenadas obtidas.

Endpoint:

- https://api.open-meteo.com/v1/forecast

Exemplo:

- https://api.open-meteo.com/v1/forecast?latitude=-19.9167&longitude=-43.9345&hourly=temperature_2m

---

## ⚡ Funcionalidades

A aplicação permite:

- ☁️ Consultar dados meteorológicos de uma cidade
- 📍 Buscar as coordenadas geográficas de uma cidade
- 🌎 Consultar informações meteorológicas de cidades brasileiras
- 🔗 Consumir APIs externas utilizando `RestTemplate`
- 🌡️ Obter informações de temperatura através da API Open-Meteo

---

## 📁 Estrutura do Projeto

```
ClimaAPI
│
└── src/main/java/com/example/ClimaAPI
    │
    ├── application
    │   └── ClimaApiApplication.java
    │
    ├── controller
    │   └── Controller.java
    │
    └── service
        └── ClimaService.java
│
└── src/main/resources
    │
    └── application.properties
│
└── pom.xml
```

---

## ⚙️ Configuração

A **Open-Meteo não exige um token de API** para as consultas utilizadas neste projeto.

Portanto, não é necessário configurar nenhuma chave ou token.

---

## ▶️ Como Executar

### 1️⃣ Clonar o repositório

```
git clone https://github.com/Bernardo-Guedes/diaw.git
```

---

### 2️⃣ Entrar na pasta do projeto

```
cd diaw/ClimaAPI
```

---

### 3️⃣ Executar a aplicação

```
mvn spring-boot:run
```

---

### 4️⃣ Acessar a API

Exemplo no navegador ou Postman:

- http://localhost:8080/clima/belo-horizonte

---

## 📚 Links úteis

Spring Boot  
- https://spring.io/projects/spring-boot

Maven  
- https://maven.apache.org/

Open-Meteo API  
- https://open-meteo.com/

---

## 🛡 Licença

Este projeto está sob a licença **MIT**.
