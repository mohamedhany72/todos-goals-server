CREATE TABLE public.todos
(
    id serial,
    todo character varying(128) NOT NULL,
    complete boolean NOT NULL DEFAULT FALSE,
    date date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT todo_owner FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE IF EXISTS public.todos
    OWNER to todos_user;