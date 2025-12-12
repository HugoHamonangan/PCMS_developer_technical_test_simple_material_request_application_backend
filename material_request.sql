--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

-- Started on 2025-12-12 08:25:21 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 20560)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 859 (class 1247 OID 20588)
-- Name: RequestPriority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RequestPriority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH'
);


ALTER TYPE public."RequestPriority" OWNER TO postgres;

--
-- TOC entry 862 (class 1247 OID 20596)
-- Name: RequestStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RequestStatus" AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."RequestStatus" OWNER TO postgres;

--
-- TOC entry 853 (class 1247 OID 20574)
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'REQUESTER',
    'APPROVER',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

--
-- TOC entry 856 (class 1247 OID 20582)
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."UserStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 20561)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 20606)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 20605)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 216
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 225 (class 1259 OID 20638)
-- Name: materialDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."materialDetails" (
    id integer NOT NULL,
    request_id integer NOT NULL,
    material_code character varying(150) NOT NULL,
    material_description text NOT NULL,
    quantity numeric(65,30) NOT NULL,
    unit text NOT NULL,
    material_type character varying(25) NOT NULL,
    specification text NOT NULL,
    brand text NOT NULL,
    notes text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."materialDetails" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 20637)
-- Name: materialDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."materialDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."materialDetails_id_seq" OWNER TO postgres;

--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 224
-- Name: materialDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."materialDetails_id_seq" OWNED BY public."materialDetails".id;


--
-- TOC entry 219 (class 1259 OID 20613)
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 20612)
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.positions_id_seq OWNER TO postgres;

--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 218
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- TOC entry 223 (class 1259 OID 20628)
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    requested_by_id integer NOT NULL,
    request_code text NOT NULL,
    request_date timestamp(3) without time zone NOT NULL,
    department_id integer NOT NULL,
    project_name character varying(150) NOT NULL,
    priority public."RequestPriority" NOT NULL,
    status public."RequestStatus" NOT NULL,
    notes text NOT NULL,
    approved_by_id integer,
    rejected_by_id integer,
    approved_at timestamp(3) without time zone,
    rejected_at timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 20627)
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requests_id_seq OWNER TO postgres;

--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 222
-- Name: requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requests_id_seq OWNED BY public.requests.id;


--
-- TOC entry 221 (class 1259 OID 20620)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone_number character varying(20) NOT NULL,
    password character varying(200) NOT NULL,
    role public."UserRole" NOT NULL,
    department_id integer NOT NULL,
    position_id integer NOT NULL,
    status public."UserStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 20619)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3323 (class 2604 OID 20609)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 3329 (class 2604 OID 20641)
-- Name: materialDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."materialDetails" ALTER COLUMN id SET DEFAULT nextval('public."materialDetails_id_seq"'::regclass);


--
-- TOC entry 3324 (class 2604 OID 20616)
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- TOC entry 3327 (class 2604 OID 20631)
-- Name: requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.requests_id_seq'::regclass);


--
-- TOC entry 3325 (class 2604 OID 20623)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3497 (class 0 OID 20561)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
70c65c01-c09a-42d3-a7b4-88d60111b5f2	24e52793eb7362d792fd7c405cfeb82c5f465e8fb5bc16e2cc2cbc4c70a4a09c	2025-12-10 23:38:11.585233+07	20251210163811_init	\N	\N	2025-12-10 23:38:11.567944+07	1
ef65f183-9311-477c-a7e2-06f7fd452655	38fe528c9939b648ae963a6f9c30299a8946041268cfa0b1d4792ebfff5f9c16	2025-12-11 00:32:36.264759+07	20251210173236_add_cascade_on_delete_to_material_details	\N	\N	2025-12-11 00:32:36.261893+07	1
\.


--
-- TOC entry 3499 (class 0 OID 20606)
-- Dependencies: 217
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name) FROM stdin;
1	Engineering
2	IT
3	Operations
4	Maintenance
5	Procurement
\.


--
-- TOC entry 3507 (class 0 OID 20638)
-- Dependencies: 225
-- Data for Name: materialDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."materialDetails" (id, request_id, material_code, material_description, quantity, unit, material_type, specification, brand, notes, "createdAt", "updatedAt") FROM stdin;
29	64	CBL-CAT6	CAT6 Plenum Ethernet Cable, 500ft	1.000000000000000000000000000000	REEL	Network	Plenum rated, Blue	CommLink	For ceiling runs.	2025-12-12 01:06:49.471	2025-12-12 01:06:49.471
30	64	SCW-5MM	5mm Rack Mounting Screws	200.000000000000000000000000000000	PCS	Hardware	Zinc Plated	FastenPro	Need spares for expansion.	2025-12-12 01:06:49.471	2025-12-12 01:06:49.471
31	64	PWR-PDU	8-Outlet Rack PDU	4.000000000000000000000000000000	PCS	Power	15A, 120V	PowerTech	Vertical mount preferred.	2025-12-12 01:06:49.471	2025-12-12 01:06:49.471
32	65	LED-150W	150W LED High Bay Light	24.000000000000000000000000000000	PCS	Lighting	5000K, 18000 Lumens	BrightView	Include mounting hardware.	2025-12-12 01:06:49.475	2025-12-12 01:06:49.475
33	65	WR-14G	14 AWG Electrical Wire	500.000000000000000000000000000000	FEET	Electrical	THHN, Black	WirePro		2025-12-12 01:06:49.475	2025-12-12 01:06:49.475
34	66	FLT-20X25	HVAC Air Filter 20x25x4	12.000000000000000000000000000000	PCS	HVAC	MERV 13	AirFlow	For all AHU units.	2025-12-12 01:06:49.479	2025-12-12 01:06:49.479
35	66	REF-R410A	R-410A Refrigerant	3.000000000000000000000000000000	CYLINDER	HVAC	25 lb cylinder	CoolTech	Handle with care.	2025-12-12 01:06:49.479	2025-12-12 01:06:49.479
36	66	BLT-V	V-Belt Set	6.000000000000000000000000000000	SET	Mechanical	Size B	DriveMax		2025-12-12 01:06:49.479	2025-12-12 01:06:49.479
37	67	PLC-AB	Allen Bradley CompactLogix PLC	1.000000000000000000000000000000	PCS	Control	1769-L33ER	Allen Bradley	Include programming cable.	2025-12-12 01:06:49.482	2025-12-12 01:06:49.482
38	67	RLY-24V	24VDC Control Relay	10.000000000000000000000000000000	PCS	Control	10A contacts	Omron		2025-12-12 01:06:49.482	2025-12-12 01:06:49.482
39	68	PPE-GLOVE	Cut-Resistant Gloves	50.000000000000000000000000000000	PAIR	Safety	Level 5 protection, Size L	SafeGuard		2025-12-12 01:06:49.486	2025-12-12 01:06:49.486
40	68	PPE-GLASS	Safety Glasses	30.000000000000000000000000000000	PCS	Safety	Anti-fog, Clear lens	VisionPro		2025-12-12 01:06:49.486	2025-12-12 01:06:49.486
41	68	TAPE-WARN	Caution Tape	10.000000000000000000000000000000	ROLL	Safety	Yellow/Black, 300ft	WarnLine		2025-12-12 01:06:49.486	2025-12-12 01:06:49.486
\.


--
-- TOC entry 3501 (class 0 OID 20613)
-- Dependencies: 219
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, name) FROM stdin;
1	Manager
2	Technician
3	Supervisor
4	Engineer
5	Specialist
\.


--
-- TOC entry 3505 (class 0 OID 20628)
-- Dependencies: 223
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, requested_by_id, request_code, request_date, department_id, project_name, priority, status, notes, approved_by_id, rejected_by_id, approved_at, rejected_at, "createdAt", "updatedAt") FROM stdin;
64	8	MR-2025-6404	2025-12-01 10:00:00	1	Q4 Server Rack Upgrade	HIGH	APPROVED	Critical materials needed immediately for infrastructure project.	7	\N	2025-12-02 09:30:00	\N	2025-12-12 01:06:49.471	2025-12-12 01:06:49.471
65	9	MR-2025-8587	2025-12-03 14:15:00	3	Factory Floor Lighting Replacement	MEDIUM	SUBMITTED	LED upgrades for energy efficiency.	\N	\N	\N	\N	2025-12-12 01:06:49.475	2025-12-12 01:06:49.475
66	10	MR-2025-4031	2025-12-04 08:45:00	4	HVAC System Maintenance	LOW	APPROVED	Quarterly maintenance supplies.	7	\N	2025-12-05 11:20:00	\N	2025-12-12 01:06:49.479	2025-12-12 01:06:49.479
67	8	MR-2025-1855	2025-12-06 16:30:00	1	Control Panel Assembly	HIGH	REJECTED	Components for new automation panel.	7	\N	2025-12-07 10:00:00	\N	2025-12-12 01:06:49.482	2025-12-12 01:06:49.482
68	9	MR-2025-5589	2025-12-08 11:00:00	3	Safety Equipment Restocking	MEDIUM	SUBMITTED	Monthly safety supplies order.	\N	\N	\N	\N	2025-12-12 01:06:49.486	2025-12-12 01:06:49.486
\.


--
-- TOC entry 3503 (class 0 OID 20620)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, phone_number, password, role, department_id, position_id, status, "createdAt", "updatedAt") FROM stdin;
6	Admin User	admin@company.com	1111111111	$2b$10$L/TQiqVN70h1I5DZ.Yfi3efYiZYyMHyuJbo8kHB4rPXnl8e6axgSS	ADMIN	2	1	ACTIVE	2025-12-12 01:06:49.448	2025-12-12 01:06:49.448
7	Alex Approver	approver@company.com	2222222222	$2b$10$L/TQiqVN70h1I5DZ.Yfi3efYiZYyMHyuJbo8kHB4rPXnl8e6axgSS	APPROVER	1	3	ACTIVE	2025-12-12 01:06:49.453	2025-12-12 01:06:49.453
8	Bob Requester	requester1@company.com	3333333333	$2b$10$L/TQiqVN70h1I5DZ.Yfi3efYiZYyMHyuJbo8kHB4rPXnl8e6axgSS	REQUESTER	1	2	ACTIVE	2025-12-12 01:06:49.456	2025-12-12 01:06:49.456
9	Carol Engineer	requester2@company.com	4444444444	$2b$10$L/TQiqVN70h1I5DZ.Yfi3efYiZYyMHyuJbo8kHB4rPXnl8e6axgSS	REQUESTER	3	4	ACTIVE	2025-12-12 01:06:49.459	2025-12-12 01:06:49.459
10	David Specialist	requester3@company.com	5555555555	$2b$10$L/TQiqVN70h1I5DZ.Yfi3efYiZYyMHyuJbo8kHB4rPXnl8e6axgSS	REQUESTER	4	5	ACTIVE	2025-12-12 01:06:49.463	2025-12-12 01:06:49.463
11	Hugo Hamonangan	hugo@example.com	08128237823	$2b$11$lBjygvghABXhdsq/q0NJ8.mu5k/mf4Ubj9m32/gV60FywR.mQCWvi	REQUESTER	1	1	ACTIVE	2025-12-12 01:09:06.857	2025-12-12 01:09:06.857
\.


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 216
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 5, true);


--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 224
-- Name: materialDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."materialDetails_id_seq"', 41, true);


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 218
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.positions_id_seq', 5, true);


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 222
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requests_id_seq', 68, true);


--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- TOC entry 3332 (class 2606 OID 20569)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3335 (class 2606 OID 20611)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 3346 (class 2606 OID 20646)
-- Name: materialDetails materialDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."materialDetails"
    ADD CONSTRAINT "materialDetails_pkey" PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 20618)
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- TOC entry 3344 (class 2606 OID 20636)
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 20626)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3333 (class 1259 OID 20647)
-- Name: departments_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX departments_name_key ON public.departments USING btree (name);


--
-- TOC entry 3336 (class 1259 OID 20648)
-- Name: positions_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX positions_name_key ON public.positions USING btree (name);


--
-- TOC entry 3339 (class 1259 OID 20649)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 3340 (class 1259 OID 20650)
-- Name: users_phone_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_phone_number_key ON public.users USING btree (phone_number);


--
-- TOC entry 3353 (class 2606 OID 21142)
-- Name: materialDetails materialDetails_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."materialDetails"
    ADD CONSTRAINT "materialDetails_request_id_fkey" FOREIGN KEY (request_id) REFERENCES public.requests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3349 (class 2606 OID 20661)
-- Name: requests requests_approved_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3350 (class 2606 OID 20666)
-- Name: requests requests_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3351 (class 2606 OID 20671)
-- Name: requests requests_rejected_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_rejected_by_id_fkey FOREIGN KEY (rejected_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3352 (class 2606 OID 20676)
-- Name: requests requests_requested_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_requested_by_id_fkey FOREIGN KEY (requested_by_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3347 (class 2606 OID 20651)
-- Name: users users_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3348 (class 2606 OID 20656)
-- Name: users users_position_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_position_id_fkey FOREIGN KEY (position_id) REFERENCES public.positions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-12-12 08:25:21 WIB

--
-- PostgreSQL database dump complete
--

