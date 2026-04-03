
-- Таблица водителей-партнёров
CREATE TABLE IF NOT EXISTS t_p43617337_netdolgoff_taxi_part.drivers (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100),
    city VARCHAR(100),
    promo_code VARCHAR(30) UNIQUE NOT NULL,
    referral_code VARCHAR(50) UNIQUE,
    referred_by_driver_id INTEGER REFERENCES t_p43617337_netdolgoff_taxi_part.drivers(id),
    balance NUMERIC(12,2) DEFAULT 0,
    total_earned NUMERIC(12,2) DEFAULT 0,
    clients_count INTEGER DEFAULT 0,
    level VARCHAR(20) DEFAULT 'bronze',
    is_active BOOLEAN DEFAULT TRUE,
    sms_code VARCHAR(10),
    sms_code_expires_at TIMESTAMP,
    auth_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица лидов (клиентов, привлечённых водителями)
CREATE TABLE IF NOT EXISTS t_p43617337_netdolgoff_taxi_part.leads (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES t_p43617337_netdolgoff_taxi_part.drivers(id),
    name VARCHAR(100),
    phone VARCHAR(20),
    debt_amount NUMERIC(12,2),
    source VARCHAR(20) DEFAULT 'link',  -- 'qr', 'promo', 'link'
    status VARCHAR(30) DEFAULT 'thinking',  -- 'thinking', 'signed', 'declined', 'no_match'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица транзакций (начисления и выплаты)
CREATE TABLE IF NOT EXISTS t_p43617337_netdolgoff_taxi_part.transactions (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES t_p43617337_netdolgoff_taxi_part.drivers(id),
    lead_id INTEGER REFERENCES t_p43617337_netdolgoff_taxi_part.leads(id),
    type VARCHAR(30) NOT NULL,  -- 'referral_bonus', 'monthly_bonus', 'registration_bonus', 'withdrawal'
    amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'paid', 'cancelled'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица заявок на вывод
CREATE TABLE IF NOT EXISTS t_p43617337_netdolgoff_taxi_part.withdrawals (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES t_p43617337_netdolgoff_taxi_part.drivers(id),
    amount NUMERIC(12,2) NOT NULL,
    card_last4 VARCHAR(4),
    card_bank VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'processing', 'paid', 'rejected'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_drivers_phone ON t_p43617337_netdolgoff_taxi_part.drivers(phone);
CREATE INDEX IF NOT EXISTS idx_drivers_promo ON t_p43617337_netdolgoff_taxi_part.drivers(promo_code);
CREATE INDEX IF NOT EXISTS idx_leads_driver ON t_p43617337_netdolgoff_taxi_part.leads(driver_id);
CREATE INDEX IF NOT EXISTS idx_transactions_driver ON t_p43617337_netdolgoff_taxi_part.transactions(driver_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_driver ON t_p43617337_netdolgoff_taxi_part.withdrawals(driver_id);
