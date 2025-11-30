-- 消息主题、模板与消息登记三张核心表

CREATE TABLE message_topics (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  topic VARCHAR(200),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  business_domain VARCHAR(100),
  priority VARCHAR(20),
  data_structure JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message_registrations (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(200) NOT NULL,
  event_id VARCHAR(200) NOT NULL,
  event_name VARCHAR(200) NOT NULL,
  endpoint TEXT NOT NULL,
  push_method VARCHAR(50) NOT NULL,
  description TEXT,
  payload_schema JSONB,
  template_id INTEGER REFERENCES templates(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

