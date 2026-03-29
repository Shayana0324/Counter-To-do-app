--
-- PostgreSQL database dump
--

\restrict GZVe7YBzLQrhxp0MmNEglFJvKkedGxtXSKczfTHkZB1bAMGn5Ep2f6rBcYOScjN

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_details VALUES (1234, 'Shayana', 'shayana@test.com', 'newuser');


--
-- Name: user_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_details_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict GZVe7YBzLQrhxp0MmNEglFJvKkedGxtXSKczfTHkZB1bAMGn5Ep2f6rBcYOScjN

