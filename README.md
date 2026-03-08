# AI Guardian
## Jedi Code Compliance System – Ethical Score & Explainability Framework for AI Applications

AI Guardian is an **AI auditing and compliance platform** designed to monitor deployed machine learning systems for **bias, fairness issues, model drift, and regulatory risks**.

The system continuously evaluates AI models using **fairness metrics, explainability techniques, and ethical risk scoring** to ensure responsible and transparent AI deployment.

This project was developed for **BLUEBIT 4.0 Hackathon – Problem Statement PS9**.

---

# Problem Statement

Modern AI systems are increasingly used in **high-impact decision-making domains**, including:

- Hiring systems  
- Healthcare diagnostics  
- Financial credit scoring  
- Risk prediction systems  

However, these models may unintentionally introduce **algorithmic bias**, resulting in unfair outcomes for certain groups based on:

- Gender  
- Age  
- Ethnicity  
- Socioeconomic background  

Most organizations deploy AI models **without continuous ethical monitoring**, which can lead to ethical, regulatory, and reputational risks.

AI Guardian solves this problem by providing a **real-time ethical auditing system** that monitors deployed AI models.

---

# Project Objective

AI Guardian aims to:

- Detect bias in AI predictions  
- Evaluate fairness metrics across demographic groups  
- Provide explainability for AI decisions  
- Monitor fairness drift over time  
- Generate ethical risk scores  
- Suggest mitigation strategies  
- Support AI governance and compliance  

---

# System Architecture

AI Guardian acts as an **ethical monitoring layer** between deployed AI models and governance frameworks.
AI Model
│
▼
Prediction API
│
▼
Data Ingestion Layer
│
▼
Fairness Evaluation Engine
│
▼
Bias Detection & Drift Monitoring
│
▼
Ethical Risk Scoring System
│
▼
Explainability Engine (SHAP)
│
▼
Compliance & Governance Layer
│
▼
Dashboard + Audit Reports


---

# Project Workflow

1. Register AI Model  
2. Collect Prediction Logs via API  
3. Store Logs in Database  
4. Evaluate Fairness Metrics  
5. Detect Bias and Drift  
6. Compute Ethical Risk Score  
7. Generate Insights and Recommendations  
8. Display Results on Dashboard  

---

# Key Features

## 1. AI Model Registration

Organizations can register deployed AI models by providing:

- Model Name  
- Model Type  
- Prediction API Endpoint  

Once registered, the system generates an **API key** and begins monitoring model predictions.

---

## 2. Real-Time Bias Detection

AI Guardian evaluates fairness using multiple fairness metrics:

- Demographic Parity  
- Equal Opportunity  
- Disparate Impact Ratio  
- Calibration Error  
- Brier Score  

These metrics help detect **unfair decision patterns across demographic groups**.

---

## 3. Fairness Drift Monitoring

AI models may become biased over time due to **data drift**.

AI Guardian monitors this using:

- Population Stability Index (PSI)  
- Data distribution monitoring  
- Historical fairness trend analysis  

---

## 4. Explainable AI Integration

To ensure transparency, the system integrates **SHAP explainability**.

This helps identify:

- which features influenced predictions  
- whether protected attributes affect model decisions  

Feature importance visualization improves **interpretability of AI outputs**.

---

## 5. Ethical Risk Score

AI Guardian generates a **composite ethical risk score**.

Risk Score Formula:

Risk Score =  
(Bias × 0.4) +  
(Drift × 0.3) +  
(Explainability Gap × 0.2) +  
(Confidence Score × 0.1)

Risk levels:

| Score | Category |
|------|---------|
Low | Safe |
Medium | Monitor |
High | Critical |

---

## 6. Compliance Monitoring

The system evaluates AI models against responsible AI frameworks such as:

- EU AI Act principles  
- Responsible AI governance standards  
- Data privacy regulations  

Compliance checks include:

- Transparency  
- Bias monitoring  
- Human oversight  
- Data governance  

---

## 7. Automated Mitigation Suggestions

When bias is detected, the system recommends actions such as:

- Retraining the model with balanced datasets  
- Removing proxy variables  
- Applying fairness constraints  
- Improving model calibration  

---

# Dashboard Overview

## Main Monitoring Dashboard

Displays:

- Number of AI models audited  
- Number of candidates evaluated  
- Bias alerts detected  
- Ethical risk score  

![Dashboard](screenshots/dashboard.png)

---

## Bias & Fairness Analysis

Displays fairness metrics across demographic groups:

- Gender  
- Age  
- Ethnicity  
- Disability  
- Veteran Status  

![Bias Metrics](screenshots/bias_metrics.png)

---

## Model Comparison

Compare multiple AI models based on ethical performance.

Metrics include:

- Demographic Parity  
- Equal Opportunity  
- Disparate Impact  
- Calibration  
- Explainability Score  

![Model Comparison](screenshots/model_compare.png)

---

## Compliance Dashboard

Tracks regulatory compliance and governance indicators.

![Compliance](screenshots/compliance.png)

---

## Privacy & Calibration Monitoring

Evaluates calibration and privacy safeguards.

![Calibration](screenshots/calibration.png)

---

# Technology Stack

## Frontend

- React.js  
- Tailwind CSS  
- Chart.js  

## Backend

- FastAPI  

## Machine Learning Libraries

- Scikit-Learn  
- Fairlearn  
- IBM AIF360  
- SHAP  

## Database

- PostgreSQL  

## Deployment

- Docker  
- Cloud Ready Architecture  

---

# Repository Structure

AI-Guardian
│
├── backend
│ ├── api
│ ├── fairness_engine
│ ├── risk_scoring
│ └── explainability
│
├── frontend
│ ├── components
│ ├── pages
│ └── dashboard
│
├── data
│
├── screenshots
│
├── requirements.txt
│
└── README.md


---

# Example Use Case

Example scenario:

A hiring AI model is deployed to screen job applications.

AI Guardian detects:

- Female candidates rejected **23% more frequently**  
- Ethnic names receiving **lower screening scores**  
- Age group **45+ receiving lower interview scores**

The system flags **bias alerts** and recommends retraining the model.

---

# Future Improvements

Future versions of AI Guardian may include:

- Real-time streaming model monitoring  
- Automated bias mitigation pipelines  
- LLM explainability tools  
- Multi-domain AI auditing  
- Automated compliance certification  

---

# Team

Team Name: **NeuralGuardians**

Team Members:

- Yashashvi Nandanwar  
- Shreyash Kulkarni  
- Kartik Sawale  

---

# License

This project was developed for **educational and research purposes** as part of **BLUEBIT 4.0 Hackathon**.
