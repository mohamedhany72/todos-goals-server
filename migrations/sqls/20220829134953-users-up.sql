CREATE TABLE public.users
(
    id serial,
    name character varying(128) NOT NULL,
    email character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    picurl character varying(128),
    gender smallint NOT NULL,
    date date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified boolean NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE (email)
);

ALTER TABLE IF EXISTS public.users
    OWNER to todos_user;
    