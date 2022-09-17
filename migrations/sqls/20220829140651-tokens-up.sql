CREATE TABLE public.tokens
(
    id serial,
    refresh character varying(1000) NOT NULL,
    browser integer NOT NULL,
    user_id integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (browser, user_id),
    CONSTRAINT "user" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE IF EXISTS public.tokens
    OWNER to todos_user;