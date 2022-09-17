CREATE TABLE public.goals
(
    id serial,
    goal character varying(128) NOT NULL,
    date date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT goal_owner FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE IF EXISTS public.goals
    OWNER to todos_user;