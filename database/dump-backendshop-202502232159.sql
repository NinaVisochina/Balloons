PGDMP      ;                }            backendshop    16.3    16.3 �    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    25623    backendshop    DATABASE        CREATE DATABASE backendshop WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE backendshop;
                postgres    false                        2615    25624    hangfire    SCHEMA        CREATE SCHEMA hangfire;
    DROP SCHEMA hangfire;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            >           0    0 
   SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    25916    aggregatedcounter    TABLE     �   CREATE TABLE hangfire.aggregatedcounter (
    id bigint NOT NULL,
    key text NOT NULL,
    value bigint NOT NULL,
    expireat timestamp with time zone
);
 '   DROP TABLE hangfire.aggregatedcounter;
       hangfire         heap    postgres    false    6            �            1259    25915    aggregatedcounter_id_seq    SEQUENCE     �   CREATE SEQUENCE hangfire.aggregatedcounter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE hangfire.aggregatedcounter_id_seq;
       hangfire          postgres    false    236    6            ?           0    0    aggregatedcounter_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE hangfire.aggregatedcounter_id_seq OWNED BY hangfire.aggregatedcounter.id;
          hangfire          postgres    false    235            �            1259    25631    counter    TABLE     �   CREATE TABLE hangfire.counter (
    id bigint NOT NULL,
    key text NOT NULL,
    value bigint NOT NULL,
    expireat timestamp with time zone
);
    DROP TABLE hangfire.counter;
       hangfire         heap    postgres    false    6            �            1259    25630    counter_id_seq    SEQUENCE     y   CREATE SEQUENCE hangfire.counter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE hangfire.counter_id_seq;
       hangfire          postgres    false    6    218            @           0    0    counter_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE hangfire.counter_id_seq OWNED BY hangfire.counter.id;
          hangfire          postgres    false    217            �            1259    25639    hash    TABLE     �   CREATE TABLE hangfire.hash (
    id bigint NOT NULL,
    key text NOT NULL,
    field text NOT NULL,
    value text,
    expireat timestamp with time zone,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.hash;
       hangfire         heap    postgres    false    6            �            1259    25638    hash_id_seq    SEQUENCE     v   CREATE SEQUENCE hangfire.hash_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE hangfire.hash_id_seq;
       hangfire          postgres    false    220    6            A           0    0    hash_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE hangfire.hash_id_seq OWNED BY hangfire.hash.id;
          hangfire          postgres    false    219            �            1259    25650    job    TABLE     #  CREATE TABLE hangfire.job (
    id bigint NOT NULL,
    stateid bigint,
    statename text,
    invocationdata jsonb NOT NULL,
    arguments jsonb NOT NULL,
    createdat timestamp with time zone NOT NULL,
    expireat timestamp with time zone,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.job;
       hangfire         heap    postgres    false    6            �            1259    25649 
   job_id_seq    SEQUENCE     u   CREATE SEQUENCE hangfire.job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE hangfire.job_id_seq;
       hangfire          postgres    false    6    222            B           0    0 
   job_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE hangfire.job_id_seq OWNED BY hangfire.job.id;
          hangfire          postgres    false    221            �            1259    25710    jobparameter    TABLE     �   CREATE TABLE hangfire.jobparameter (
    id bigint NOT NULL,
    jobid bigint NOT NULL,
    name text NOT NULL,
    value text,
    updatecount integer DEFAULT 0 NOT NULL
);
 "   DROP TABLE hangfire.jobparameter;
       hangfire         heap    postgres    false    6            �            1259    25709    jobparameter_id_seq    SEQUENCE     ~   CREATE SEQUENCE hangfire.jobparameter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE hangfire.jobparameter_id_seq;
       hangfire          postgres    false    233    6            C           0    0    jobparameter_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE hangfire.jobparameter_id_seq OWNED BY hangfire.jobparameter.id;
          hangfire          postgres    false    232            �            1259    25675    jobqueue    TABLE     �   CREATE TABLE hangfire.jobqueue (
    id bigint NOT NULL,
    jobid bigint NOT NULL,
    queue text NOT NULL,
    fetchedat timestamp with time zone,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.jobqueue;
       hangfire         heap    postgres    false    6            �            1259    25674    jobqueue_id_seq    SEQUENCE     z   CREATE SEQUENCE hangfire.jobqueue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE hangfire.jobqueue_id_seq;
       hangfire          postgres    false    6    226            D           0    0    jobqueue_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE hangfire.jobqueue_id_seq OWNED BY hangfire.jobqueue.id;
          hangfire          postgres    false    225            �            1259    25683    list    TABLE     �   CREATE TABLE hangfire.list (
    id bigint NOT NULL,
    key text NOT NULL,
    value text,
    expireat timestamp with time zone,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.list;
       hangfire         heap    postgres    false    6            �            1259    25682    list_id_seq    SEQUENCE     v   CREATE SEQUENCE hangfire.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE hangfire.list_id_seq;
       hangfire          postgres    false    228    6            E           0    0    list_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE hangfire.list_id_seq OWNED BY hangfire.list.id;
          hangfire          postgres    false    227            �            1259    25724    lock    TABLE     �   CREATE TABLE hangfire.lock (
    resource text NOT NULL,
    updatecount integer DEFAULT 0 NOT NULL,
    acquired timestamp with time zone
);
    DROP TABLE hangfire.lock;
       hangfire         heap    postgres    false    6            �            1259    25625    schema    TABLE     ?   CREATE TABLE hangfire.schema (
    version integer NOT NULL
);
    DROP TABLE hangfire.schema;
       hangfire         heap    postgres    false    6            �            1259    25691    server    TABLE     �   CREATE TABLE hangfire.server (
    id text NOT NULL,
    data jsonb,
    lastheartbeat timestamp with time zone NOT NULL,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.server;
       hangfire         heap    postgres    false    6            �            1259    25699    set    TABLE     �   CREATE TABLE hangfire.set (
    id bigint NOT NULL,
    key text NOT NULL,
    score double precision NOT NULL,
    value text NOT NULL,
    expireat timestamp with time zone,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.set;
       hangfire         heap    postgres    false    6            �            1259    25698 
   set_id_seq    SEQUENCE     u   CREATE SEQUENCE hangfire.set_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE hangfire.set_id_seq;
       hangfire          postgres    false    6    231            F           0    0 
   set_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE hangfire.set_id_seq OWNED BY hangfire.set.id;
          hangfire          postgres    false    230            �            1259    25660    state    TABLE     �   CREATE TABLE hangfire.state (
    id bigint NOT NULL,
    jobid bigint NOT NULL,
    name text NOT NULL,
    reason text,
    createdat timestamp with time zone NOT NULL,
    data jsonb,
    updatecount integer DEFAULT 0 NOT NULL
);
    DROP TABLE hangfire.state;
       hangfire         heap    postgres    false    6            �            1259    25659    state_id_seq    SEQUENCE     w   CREATE SEQUENCE hangfire.state_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE hangfire.state_id_seq;
       hangfire          postgres    false    224    6            G           0    0    state_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE hangfire.state_id_seq OWNED BY hangfire.state.id;
          hangfire          postgres    false    223            �            1259    26084    AspNetRoleClaims    TABLE     �   CREATE TABLE public."AspNetRoleClaims" (
    "Id" integer NOT NULL,
    "RoleId" text NOT NULL,
    "ClaimType" text,
    "ClaimValue" text
);
 &   DROP TABLE public."AspNetRoleClaims";
       public         heap    postgres    false    4            �            1259    26083    AspNetRoleClaims_Id_seq    SEQUENCE     �   ALTER TABLE public."AspNetRoleClaims" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."AspNetRoleClaims_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    245            �            1259    26053    AspNetRoles    TABLE     �   CREATE TABLE public."AspNetRoles" (
    "Id" text NOT NULL,
    "Name" character varying(256),
    "NormalizedName" character varying(256),
    "ConcurrencyStamp" text
);
 !   DROP TABLE public."AspNetRoles";
       public         heap    postgres    false    4            �            1259    26097    AspNetUserClaims    TABLE     �   CREATE TABLE public."AspNetUserClaims" (
    "Id" integer NOT NULL,
    "UserId" text NOT NULL,
    "ClaimType" text,
    "ClaimValue" text
);
 &   DROP TABLE public."AspNetUserClaims";
       public         heap    postgres    false    4            �            1259    26096    AspNetUserClaims_Id_seq    SEQUENCE     �   ALTER TABLE public."AspNetUserClaims" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."AspNetUserClaims_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    247    4            �            1259    26109    AspNetUserLogins    TABLE     �   CREATE TABLE public."AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text,
    "UserId" text NOT NULL
);
 &   DROP TABLE public."AspNetUserLogins";
       public         heap    postgres    false    4            �            1259    26121    AspNetUserRoles    TABLE     b   CREATE TABLE public."AspNetUserRoles" (
    "UserId" text NOT NULL,
    "RoleId" text NOT NULL
);
 %   DROP TABLE public."AspNetUserRoles";
       public         heap    postgres    false    4            �            1259    26138    AspNetUserTokens    TABLE     �   CREATE TABLE public."AspNetUserTokens" (
    "UserId" text NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text
);
 &   DROP TABLE public."AspNetUserTokens";
       public         heap    postgres    false    4            �            1259    26060    AspNetUsers    TABLE     �  CREATE TABLE public."AspNetUsers" (
    "Id" text NOT NULL,
    "Firstname" character varying(100),
    "Lastname" text,
    "Birthdate" timestamp with time zone,
    "UserName" character varying(256),
    "NormalizedUserName" character varying(256),
    "Email" character varying(256),
    "NormalizedEmail" character varying(256),
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text,
    "SecurityStamp" text,
    "ConcurrencyStamp" text,
    "PhoneNumber" text,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp with time zone,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL
);
 !   DROP TABLE public."AspNetUsers";
       public         heap    postgres    false    4                       1259    26221 	   CartItems    TABLE     �   CREATE TABLE public."CartItems" (
    "CartItemId" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "Quantity" integer NOT NULL,
    "CartId" integer NOT NULL
);
    DROP TABLE public."CartItems";
       public         heap    postgres    false    4                       1259    26220    CartItems_CartItemId_seq    SEQUENCE     �   ALTER TABLE public."CartItems" ALTER COLUMN "CartItemId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."CartItems_CartItemId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    262    4            �            1259    26151    Carts    TABLE     [   CREATE TABLE public."Carts" (
    "CartId" integer NOT NULL,
    "UserId" text NOT NULL
);
    DROP TABLE public."Carts";
       public         heap    postgres    false    4            �            1259    26150    Carts_CartId_seq    SEQUENCE     �   ALTER TABLE public."Carts" ALTER COLUMN "CartId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Carts_CartId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    252            �            1259    26068 	   Discounts    TABLE     �   CREATE TABLE public."Discounts" (
    "DiscountId" integer NOT NULL,
    "Name" text NOT NULL,
    "Percentage" numeric(5,2) NOT NULL,
    "MinimumOrderAmount" numeric
);
    DROP TABLE public."Discounts";
       public         heap    postgres    false    4            �            1259    26067    Discounts_DiscountId_seq    SEQUENCE     �   ALTER TABLE public."Discounts" ALTER COLUMN "DiscountId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Discounts_DiscountId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241    4                       1259    26237    ProductDescImages    TABLE     �   CREATE TABLE public."ProductDescImages" (
    "Id" integer NOT NULL,
    "Image" character varying(255) NOT NULL,
    "DateCreate" timestamp with time zone NOT NULL,
    "ProductId" integer
);
 '   DROP TABLE public."ProductDescImages";
       public         heap    postgres    false    4                       1259    26236    ProductDescImages_Id_seq    SEQUENCE     �   ALTER TABLE public."ProductDescImages" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProductDescImages_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    264            
           1259    26248 
   ProductImages    TABLE     �   CREATE TABLE public."ProductImages" (
    "Id" integer NOT NULL,
    "Image" character varying(255) NOT NULL,
    "Priority" integer NOT NULL,
    "ProductId" integer NOT NULL
);
 #   DROP TABLE public."ProductImages";
       public         heap    postgres    false    4            	           1259    26247    ProductImages_Id_seq    SEQUENCE     �   ALTER TABLE public."ProductImages" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ProductImages_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    266    4            �            1259    26164 
   RefreshTokens    TABLE     �   CREATE TABLE public."RefreshTokens" (
    "Id" integer NOT NULL,
    "Token" text NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "UserId" text NOT NULL
);
 #   DROP TABLE public."RefreshTokens";
       public         heap    postgres    false    4            �            1259    26163    RefreshTokens_Id_seq    SEQUENCE     �   ALTER TABLE public."RefreshTokens" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RefreshTokens_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    254                       1259    26275 
   WishListItems    TABLE     �   CREATE TABLE public."WishListItems" (
    "Id" integer NOT NULL,
    "UserId" text NOT NULL,
    "ProductId" integer NOT NULL
);
 #   DROP TABLE public."WishListItems";
       public         heap    postgres    false    4            
           1259    26274    WishListItems_Id_seq    SEQUENCE     �   ALTER TABLE public."WishListItems" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."WishListItems_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    270            �            1259    26048    __EFMigrationsHistory    TABLE     �   CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);
 +   DROP TABLE public."__EFMigrationsHistory";
       public         heap    postgres    false    4            �            1259    26076 
   tblCategories    TABLE     �   CREATE TABLE public."tblCategories" (
    "CategoryId" integer NOT NULL,
    "Slug" text NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Description" character varying(255),
    "ImageCategoryPath" text
);
 #   DROP TABLE public."tblCategories";
       public         heap    postgres    false    4            �            1259    26075    tblCategories_CategoryId_seq    SEQUENCE     �   ALTER TABLE public."tblCategories" ALTER COLUMN "CategoryId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."tblCategories_CategoryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    243                       1259    26259 
   tblOrderItems    TABLE     �   CREATE TABLE public."tblOrderItems" (
    "OrderItemId" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "Quantity" integer NOT NULL,
    "Price" numeric(18,2) NOT NULL,
    "OrderId" integer NOT NULL
);
 #   DROP TABLE public."tblOrderItems";
       public         heap    postgres    false    4                       1259    26258    tblOrderItems_OrderItemId_seq    SEQUENCE     �   ALTER TABLE public."tblOrderItems" ALTER COLUMN "OrderItemId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."tblOrderItems_OrderItemId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    268    4                        1259    26177 	   tblOrders    TABLE     
  CREATE TABLE public."tblOrders" (
    "OrderId" integer NOT NULL,
    "OrderDate" timestamp with time zone NOT NULL,
    "TotalAmount" numeric NOT NULL,
    "UserId" text NOT NULL,
    "Status" integer NOT NULL,
    "DiscountId" integer,
    "Address" text NOT NULL
);
    DROP TABLE public."tblOrders";
       public         heap    postgres    false    4            �            1259    26176    tblOrders_OrderId_seq    SEQUENCE     �   ALTER TABLE public."tblOrders" ALTER COLUMN "OrderId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."tblOrders_OrderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    256                       1259    26208    tblProducts    TABLE     �  CREATE TABLE public."tblProducts" (
    "Id" integer NOT NULL,
    "Slug" text NOT NULL,
    "Code" text NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Description" text,
    "Manufacturer" text,
    "Size" text,
    "Color" text,
    "Type" text,
    "Form" text,
    "Price" numeric(18,2) NOT NULL,
    "QuantityInPack" integer,
    "QuantityInStock" integer NOT NULL,
    "Modeles" text,
    "SubCategoryId" integer NOT NULL
);
 !   DROP TABLE public."tblProducts";
       public         heap    postgres    false    4                       1259    26207    tblProducts_Id_seq    SEQUENCE     �   ALTER TABLE public."tblProducts" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."tblProducts_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    260                       1259    26195    tblSubCategories    TABLE       CREATE TABLE public."tblSubCategories" (
    "SubCategoryId" integer NOT NULL,
    "Slug" text NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Description" character varying(255),
    "ImageSubCategoryPath" text,
    "CategoryId" integer NOT NULL
);
 &   DROP TABLE public."tblSubCategories";
       public         heap    postgres    false    4                       1259    26194 "   tblSubCategories_SubCategoryId_seq    SEQUENCE     �   ALTER TABLE public."tblSubCategories" ALTER COLUMN "SubCategoryId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."tblSubCategories_SubCategoryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    258    4            �           2604    25919    aggregatedcounter id    DEFAULT     �   ALTER TABLE ONLY hangfire.aggregatedcounter ALTER COLUMN id SET DEFAULT nextval('hangfire.aggregatedcounter_id_seq'::regclass);
 E   ALTER TABLE hangfire.aggregatedcounter ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    235    236    236            �           2604    25757 
   counter id    DEFAULT     l   ALTER TABLE ONLY hangfire.counter ALTER COLUMN id SET DEFAULT nextval('hangfire.counter_id_seq'::regclass);
 ;   ALTER TABLE hangfire.counter ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    217    218    218            �           2604    25766    hash id    DEFAULT     f   ALTER TABLE ONLY hangfire.hash ALTER COLUMN id SET DEFAULT nextval('hangfire.hash_id_seq'::regclass);
 8   ALTER TABLE hangfire.hash ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    220    219    220            �           2604    25776    job id    DEFAULT     d   ALTER TABLE ONLY hangfire.job ALTER COLUMN id SET DEFAULT nextval('hangfire.job_id_seq'::regclass);
 7   ALTER TABLE hangfire.job ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    222    221    222            �           2604    25826    jobparameter id    DEFAULT     v   ALTER TABLE ONLY hangfire.jobparameter ALTER COLUMN id SET DEFAULT nextval('hangfire.jobparameter_id_seq'::regclass);
 @   ALTER TABLE hangfire.jobparameter ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    232    233    233            �           2604    25849    jobqueue id    DEFAULT     n   ALTER TABLE ONLY hangfire.jobqueue ALTER COLUMN id SET DEFAULT nextval('hangfire.jobqueue_id_seq'::regclass);
 <   ALTER TABLE hangfire.jobqueue ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    225    226    226            �           2604    25869    list id    DEFAULT     f   ALTER TABLE ONLY hangfire.list ALTER COLUMN id SET DEFAULT nextval('hangfire.list_id_seq'::regclass);
 8   ALTER TABLE hangfire.list ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    227    228    228            �           2604    25878    set id    DEFAULT     d   ALTER TABLE ONLY hangfire.set ALTER COLUMN id SET DEFAULT nextval('hangfire.set_id_seq'::regclass);
 7   ALTER TABLE hangfire.set ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    231    230    231            �           2604    25803    state id    DEFAULT     h   ALTER TABLE ONLY hangfire.state ALTER COLUMN id SET DEFAULT nextval('hangfire.state_id_seq'::regclass);
 9   ALTER TABLE hangfire.state ALTER COLUMN id DROP DEFAULT;
       hangfire          postgres    false    223    224    224                      0    25916    aggregatedcounter 
   TABLE DATA           G   COPY hangfire.aggregatedcounter (id, key, value, expireat) FROM stdin;
    hangfire          postgres    false    236   �                0    25631    counter 
   TABLE DATA           =   COPY hangfire.counter (id, key, value, expireat) FROM stdin;
    hangfire          postgres    false    218   �                0    25639    hash 
   TABLE DATA           N   COPY hangfire.hash (id, key, field, value, expireat, updatecount) FROM stdin;
    hangfire          postgres    false    220                   0    25650    job 
   TABLE DATA           t   COPY hangfire.job (id, stateid, statename, invocationdata, arguments, createdat, expireat, updatecount) FROM stdin;
    hangfire          postgres    false    222   d                0    25710    jobparameter 
   TABLE DATA           M   COPY hangfire.jobparameter (id, jobid, name, value, updatecount) FROM stdin;
    hangfire          postgres    false    233   �                0    25675    jobqueue 
   TABLE DATA           N   COPY hangfire.jobqueue (id, jobid, queue, fetchedat, updatecount) FROM stdin;
    hangfire          postgres    false    226   �      
          0    25683    list 
   TABLE DATA           G   COPY hangfire.list (id, key, value, expireat, updatecount) FROM stdin;
    hangfire          postgres    false    228   �                0    25724    lock 
   TABLE DATA           A   COPY hangfire.lock (resource, updatecount, acquired) FROM stdin;
    hangfire          postgres    false    234   �                0    25625    schema 
   TABLE DATA           +   COPY hangfire.schema (version) FROM stdin;
    hangfire          postgres    false    216   �                0    25691    server 
   TABLE DATA           H   COPY hangfire.server (id, data, lastheartbeat, updatecount) FROM stdin;
    hangfire          postgres    false    229                   0    25699    set 
   TABLE DATA           M   COPY hangfire.set (id, key, score, value, expireat, updatecount) FROM stdin;
    hangfire          postgres    false    231   �      	          0    25660    state 
   TABLE DATA           X   COPY hangfire.state (id, jobid, name, reason, createdat, data, updatecount) FROM stdin;
    hangfire          postgres    false    224                   0    26084    AspNetRoleClaims 
   TABLE DATA           W   COPY public."AspNetRoleClaims" ("Id", "RoleId", "ClaimType", "ClaimValue") FROM stdin;
    public          postgres    false    245   8                0    26053    AspNetRoles 
   TABLE DATA           [   COPY public."AspNetRoles" ("Id", "Name", "NormalizedName", "ConcurrencyStamp") FROM stdin;
    public          postgres    false    238   U                 0    26097    AspNetUserClaims 
   TABLE DATA           W   COPY public."AspNetUserClaims" ("Id", "UserId", "ClaimType", "ClaimValue") FROM stdin;
    public          postgres    false    247   r      !          0    26109    AspNetUserLogins 
   TABLE DATA           m   COPY public."AspNetUserLogins" ("LoginProvider", "ProviderKey", "ProviderDisplayName", "UserId") FROM stdin;
    public          postgres    false    248   �      "          0    26121    AspNetUserRoles 
   TABLE DATA           ?   COPY public."AspNetUserRoles" ("UserId", "RoleId") FROM stdin;
    public          postgres    false    249   �      #          0    26138    AspNetUserTokens 
   TABLE DATA           X   COPY public."AspNetUserTokens" ("UserId", "LoginProvider", "Name", "Value") FROM stdin;
    public          postgres    false    250   �                0    26060    AspNetUsers 
   TABLE DATA           H  COPY public."AspNetUsers" ("Id", "Firstname", "Lastname", "Birthdate", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount") FROM stdin;
    public          postgres    false    239   �      /          0    26221 	   CartItems 
   TABLE DATA           V   COPY public."CartItems" ("CartItemId", "ProductId", "Quantity", "CartId") FROM stdin;
    public          postgres    false    262         %          0    26151    Carts 
   TABLE DATA           5   COPY public."Carts" ("CartId", "UserId") FROM stdin;
    public          postgres    false    252                    0    26068 	   Discounts 
   TABLE DATA           _   COPY public."Discounts" ("DiscountId", "Name", "Percentage", "MinimumOrderAmount") FROM stdin;
    public          postgres    false    241   =      1          0    26237    ProductDescImages 
   TABLE DATA           W   COPY public."ProductDescImages" ("Id", "Image", "DateCreate", "ProductId") FROM stdin;
    public          postgres    false    264   Z      3          0    26248 
   ProductImages 
   TABLE DATA           Q   COPY public."ProductImages" ("Id", "Image", "Priority", "ProductId") FROM stdin;
    public          postgres    false    266   w      '          0    26164 
   RefreshTokens 
   TABLE DATA           R   COPY public."RefreshTokens" ("Id", "Token", "CreationDate", "UserId") FROM stdin;
    public          postgres    false    254   �      7          0    26275 
   WishListItems 
   TABLE DATA           F   COPY public."WishListItems" ("Id", "UserId", "ProductId") FROM stdin;
    public          postgres    false    270   �                0    26048    __EFMigrationsHistory 
   TABLE DATA           R   COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
    public          postgres    false    237   �                0    26076 
   tblCategories 
   TABLE DATA           k   COPY public."tblCategories" ("CategoryId", "Slug", "Name", "Description", "ImageCategoryPath") FROM stdin;
    public          postgres    false    243         5          0    26259 
   tblOrderItems 
   TABLE DATA           e   COPY public."tblOrderItems" ("OrderItemId", "ProductId", "Quantity", "Price", "OrderId") FROM stdin;
    public          postgres    false    268   "      )          0    26177 	   tblOrders 
   TABLE DATA           y   COPY public."tblOrders" ("OrderId", "OrderDate", "TotalAmount", "UserId", "Status", "DiscountId", "Address") FROM stdin;
    public          postgres    false    256   ?      -          0    26208    tblProducts 
   TABLE DATA           �   COPY public."tblProducts" ("Id", "Slug", "Code", "Name", "Description", "Manufacturer", "Size", "Color", "Type", "Form", "Price", "QuantityInPack", "QuantityInStock", "Modeles", "SubCategoryId") FROM stdin;
    public          postgres    false    260   \      +          0    26195    tblSubCategories 
   TABLE DATA           �   COPY public."tblSubCategories" ("SubCategoryId", "Slug", "Name", "Description", "ImageSubCategoryPath", "CategoryId") FROM stdin;
    public          postgres    false    258   y      H           0    0    aggregatedcounter_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('hangfire.aggregatedcounter_id_seq', 1, false);
          hangfire          postgres    false    235            I           0    0    counter_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('hangfire.counter_id_seq', 1, false);
          hangfire          postgres    false    217            J           0    0    hash_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('hangfire.hash_id_seq', 7, true);
          hangfire          postgres    false    219            K           0    0 
   job_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('hangfire.job_id_seq', 1, false);
          hangfire          postgres    false    221            L           0    0    jobparameter_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('hangfire.jobparameter_id_seq', 1, false);
          hangfire          postgres    false    232            M           0    0    jobqueue_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('hangfire.jobqueue_id_seq', 1, false);
          hangfire          postgres    false    225            N           0    0    list_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('hangfire.list_id_seq', 1, false);
          hangfire          postgres    false    227            O           0    0 
   set_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('hangfire.set_id_seq', 1, true);
          hangfire          postgres    false    230            P           0    0    state_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('hangfire.state_id_seq', 1, false);
          hangfire          postgres    false    223            Q           0    0    AspNetRoleClaims_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."AspNetRoleClaims_Id_seq"', 1, false);
          public          postgres    false    244            R           0    0    AspNetUserClaims_Id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."AspNetUserClaims_Id_seq"', 1, false);
          public          postgres    false    246            S           0    0    CartItems_CartItemId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."CartItems_CartItemId_seq"', 1, false);
          public          postgres    false    261            T           0    0    Carts_CartId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Carts_CartId_seq"', 1, false);
          public          postgres    false    251            U           0    0    Discounts_DiscountId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Discounts_DiscountId_seq"', 1, false);
          public          postgres    false    240            V           0    0    ProductDescImages_Id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ProductDescImages_Id_seq"', 1, false);
          public          postgres    false    263            W           0    0    ProductImages_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."ProductImages_Id_seq"', 1, false);
          public          postgres    false    265            X           0    0    RefreshTokens_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."RefreshTokens_Id_seq"', 1, false);
          public          postgres    false    253            Y           0    0    WishListItems_Id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."WishListItems_Id_seq"', 1, false);
          public          postgres    false    269            Z           0    0    tblCategories_CategoryId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."tblCategories_CategoryId_seq"', 1, false);
          public          postgres    false    242            [           0    0    tblOrderItems_OrderItemId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."tblOrderItems_OrderItemId_seq"', 1, false);
          public          postgres    false    267            \           0    0    tblOrders_OrderId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."tblOrders_OrderId_seq"', 1, false);
          public          postgres    false    255            ]           0    0    tblProducts_Id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."tblProducts_Id_seq"', 1, false);
          public          postgres    false    259            ^           0    0 "   tblSubCategories_SubCategoryId_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."tblSubCategories_SubCategoryId_seq"', 1, false);
          public          postgres    false    257                       2606    25925 +   aggregatedcounter aggregatedcounter_key_key 
   CONSTRAINT     g   ALTER TABLE ONLY hangfire.aggregatedcounter
    ADD CONSTRAINT aggregatedcounter_key_key UNIQUE (key);
 W   ALTER TABLE ONLY hangfire.aggregatedcounter DROP CONSTRAINT aggregatedcounter_key_key;
       hangfire            postgres    false    236                        2606    25923 (   aggregatedcounter aggregatedcounter_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY hangfire.aggregatedcounter
    ADD CONSTRAINT aggregatedcounter_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY hangfire.aggregatedcounter DROP CONSTRAINT aggregatedcounter_pkey;
       hangfire            postgres    false    236            �           2606    25759    counter counter_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY hangfire.counter
    ADD CONSTRAINT counter_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY hangfire.counter DROP CONSTRAINT counter_pkey;
       hangfire            postgres    false    218            �           2606    25894    hash hash_key_field_key 
   CONSTRAINT     Z   ALTER TABLE ONLY hangfire.hash
    ADD CONSTRAINT hash_key_field_key UNIQUE (key, field);
 C   ALTER TABLE ONLY hangfire.hash DROP CONSTRAINT hash_key_field_key;
       hangfire            postgres    false    220    220            �           2606    25768    hash hash_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY hangfire.hash
    ADD CONSTRAINT hash_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY hangfire.hash DROP CONSTRAINT hash_pkey;
       hangfire            postgres    false    220                       2606    25778    job job_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY hangfire.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY hangfire.job DROP CONSTRAINT job_pkey;
       hangfire            postgres    false    222                       2606    25828    jobparameter jobparameter_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY hangfire.jobparameter
    ADD CONSTRAINT jobparameter_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY hangfire.jobparameter DROP CONSTRAINT jobparameter_pkey;
       hangfire            postgres    false    233                       2606    25851    jobqueue jobqueue_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY hangfire.jobqueue
    ADD CONSTRAINT jobqueue_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY hangfire.jobqueue DROP CONSTRAINT jobqueue_pkey;
       hangfire            postgres    false    226                       2606    25871    list list_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY hangfire.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY hangfire.list DROP CONSTRAINT list_pkey;
       hangfire            postgres    false    228                       2606    25750    lock lock_resource_key 
   CONSTRAINT     �   ALTER TABLE ONLY hangfire.lock
    ADD CONSTRAINT lock_resource_key UNIQUE (resource);

ALTER TABLE ONLY hangfire.lock REPLICA IDENTITY USING INDEX lock_resource_key;
 B   ALTER TABLE ONLY hangfire.lock DROP CONSTRAINT lock_resource_key;
       hangfire            postgres    false    234            �           2606    25629    schema schema_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY hangfire.schema
    ADD CONSTRAINT schema_pkey PRIMARY KEY (version);
 >   ALTER TABLE ONLY hangfire.schema DROP CONSTRAINT schema_pkey;
       hangfire            postgres    false    216                       2606    25897    server server_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY hangfire.server
    ADD CONSTRAINT server_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY hangfire.server DROP CONSTRAINT server_pkey;
       hangfire            postgres    false    229                       2606    25899    set set_key_value_key 
   CONSTRAINT     X   ALTER TABLE ONLY hangfire.set
    ADD CONSTRAINT set_key_value_key UNIQUE (key, value);
 A   ALTER TABLE ONLY hangfire.set DROP CONSTRAINT set_key_value_key;
       hangfire            postgres    false    231    231                       2606    25880    set set_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY hangfire.set
    ADD CONSTRAINT set_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY hangfire.set DROP CONSTRAINT set_pkey;
       hangfire            postgres    false    231                       2606    25805    state state_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY hangfire.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY hangfire.state DROP CONSTRAINT state_pkey;
       hangfire            postgres    false    224            0           2606    26090 $   AspNetRoleClaims PK_AspNetRoleClaims 
   CONSTRAINT     h   ALTER TABLE ONLY public."AspNetRoleClaims"
    ADD CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id");
 R   ALTER TABLE ONLY public."AspNetRoleClaims" DROP CONSTRAINT "PK_AspNetRoleClaims";
       public            postgres    false    245            $           2606    26059    AspNetRoles PK_AspNetRoles 
   CONSTRAINT     ^   ALTER TABLE ONLY public."AspNetRoles"
    ADD CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."AspNetRoles" DROP CONSTRAINT "PK_AspNetRoles";
       public            postgres    false    238            3           2606    26103 $   AspNetUserClaims PK_AspNetUserClaims 
   CONSTRAINT     h   ALTER TABLE ONLY public."AspNetUserClaims"
    ADD CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id");
 R   ALTER TABLE ONLY public."AspNetUserClaims" DROP CONSTRAINT "PK_AspNetUserClaims";
       public            postgres    false    247            6           2606    26115 $   AspNetUserLogins PK_AspNetUserLogins 
   CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserLogins"
    ADD CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey");
 R   ALTER TABLE ONLY public."AspNetUserLogins" DROP CONSTRAINT "PK_AspNetUserLogins";
       public            postgres    false    248    248            9           2606    26127 "   AspNetUserRoles PK_AspNetUserRoles 
   CONSTRAINT     t   ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId");
 P   ALTER TABLE ONLY public."AspNetUserRoles" DROP CONSTRAINT "PK_AspNetUserRoles";
       public            postgres    false    249    249            ;           2606    26144 $   AspNetUserTokens PK_AspNetUserTokens 
   CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserTokens"
    ADD CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name");
 R   ALTER TABLE ONLY public."AspNetUserTokens" DROP CONSTRAINT "PK_AspNetUserTokens";
       public            postgres    false    250    250    250            (           2606    26066    AspNetUsers PK_AspNetUsers 
   CONSTRAINT     ^   ALTER TABLE ONLY public."AspNetUsers"
    ADD CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."AspNetUsers" DROP CONSTRAINT "PK_AspNetUsers";
       public            postgres    false    239            O           2606    26225    CartItems PK_CartItems 
   CONSTRAINT     b   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "PK_CartItems" PRIMARY KEY ("CartItemId");
 D   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "PK_CartItems";
       public            postgres    false    262            >           2606    26157    Carts PK_Carts 
   CONSTRAINT     V   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "PK_Carts" PRIMARY KEY ("CartId");
 <   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "PK_Carts";
       public            postgres    false    252            +           2606    26074    Discounts PK_Discounts 
   CONSTRAINT     b   ALTER TABLE ONLY public."Discounts"
    ADD CONSTRAINT "PK_Discounts" PRIMARY KEY ("DiscountId");
 D   ALTER TABLE ONLY public."Discounts" DROP CONSTRAINT "PK_Discounts";
       public            postgres    false    241            R           2606    26241 &   ProductDescImages PK_ProductDescImages 
   CONSTRAINT     j   ALTER TABLE ONLY public."ProductDescImages"
    ADD CONSTRAINT "PK_ProductDescImages" PRIMARY KEY ("Id");
 T   ALTER TABLE ONLY public."ProductDescImages" DROP CONSTRAINT "PK_ProductDescImages";
       public            postgres    false    264            U           2606    26252    ProductImages PK_ProductImages 
   CONSTRAINT     b   ALTER TABLE ONLY public."ProductImages"
    ADD CONSTRAINT "PK_ProductImages" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."ProductImages" DROP CONSTRAINT "PK_ProductImages";
       public            postgres    false    266            A           2606    26170    RefreshTokens PK_RefreshTokens 
   CONSTRAINT     b   ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."RefreshTokens" DROP CONSTRAINT "PK_RefreshTokens";
       public            postgres    false    254            \           2606    26281    WishListItems PK_WishListItems 
   CONSTRAINT     b   ALTER TABLE ONLY public."WishListItems"
    ADD CONSTRAINT "PK_WishListItems" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."WishListItems" DROP CONSTRAINT "PK_WishListItems";
       public            postgres    false    270            "           2606    26052 .   __EFMigrationsHistory PK___EFMigrationsHistory 
   CONSTRAINT     {   ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");
 \   ALTER TABLE ONLY public."__EFMigrationsHistory" DROP CONSTRAINT "PK___EFMigrationsHistory";
       public            postgres    false    237            -           2606    26082    tblCategories PK_tblCategories 
   CONSTRAINT     j   ALTER TABLE ONLY public."tblCategories"
    ADD CONSTRAINT "PK_tblCategories" PRIMARY KEY ("CategoryId");
 L   ALTER TABLE ONLY public."tblCategories" DROP CONSTRAINT "PK_tblCategories";
       public            postgres    false    243            Y           2606    26263    tblOrderItems PK_tblOrderItems 
   CONSTRAINT     k   ALTER TABLE ONLY public."tblOrderItems"
    ADD CONSTRAINT "PK_tblOrderItems" PRIMARY KEY ("OrderItemId");
 L   ALTER TABLE ONLY public."tblOrderItems" DROP CONSTRAINT "PK_tblOrderItems";
       public            postgres    false    268            E           2606    26183    tblOrders PK_tblOrders 
   CONSTRAINT     _   ALTER TABLE ONLY public."tblOrders"
    ADD CONSTRAINT "PK_tblOrders" PRIMARY KEY ("OrderId");
 D   ALTER TABLE ONLY public."tblOrders" DROP CONSTRAINT "PK_tblOrders";
       public            postgres    false    256            K           2606    26214    tblProducts PK_tblProducts 
   CONSTRAINT     ^   ALTER TABLE ONLY public."tblProducts"
    ADD CONSTRAINT "PK_tblProducts" PRIMARY KEY ("Id");
 H   ALTER TABLE ONLY public."tblProducts" DROP CONSTRAINT "PK_tblProducts";
       public            postgres    false    260            H           2606    26201 $   tblSubCategories PK_tblSubCategories 
   CONSTRAINT     s   ALTER TABLE ONLY public."tblSubCategories"
    ADD CONSTRAINT "PK_tblSubCategories" PRIMARY KEY ("SubCategoryId");
 R   ALTER TABLE ONLY public."tblSubCategories" DROP CONSTRAINT "PK_tblSubCategories";
       public            postgres    false    258            �           1259    25933    ix_hangfire_counter_expireat    INDEX     V   CREATE INDEX ix_hangfire_counter_expireat ON hangfire.counter USING btree (expireat);
 2   DROP INDEX hangfire.ix_hangfire_counter_expireat;
       hangfire            postgres    false    218            �           1259    25888    ix_hangfire_counter_key    INDEX     L   CREATE INDEX ix_hangfire_counter_key ON hangfire.counter USING btree (key);
 -   DROP INDEX hangfire.ix_hangfire_counter_key;
       hangfire            postgres    false    218            �           1259    25942    ix_hangfire_hash_expireat    INDEX     P   CREATE INDEX ix_hangfire_hash_expireat ON hangfire.hash USING btree (expireat);
 /   DROP INDEX hangfire.ix_hangfire_hash_expireat;
       hangfire            postgres    false    220                        1259    25959    ix_hangfire_job_expireat    INDEX     N   CREATE INDEX ix_hangfire_job_expireat ON hangfire.job USING btree (expireat);
 .   DROP INDEX hangfire.ix_hangfire_job_expireat;
       hangfire            postgres    false    222                       1259    25895    ix_hangfire_job_statename    INDEX     P   CREATE INDEX ix_hangfire_job_statename ON hangfire.job USING btree (statename);
 /   DROP INDEX hangfire.ix_hangfire_job_statename;
       hangfire            postgres    false    222                       1259    26046 %   ix_hangfire_job_statename_is_not_null    INDEX     �   CREATE INDEX ix_hangfire_job_statename_is_not_null ON hangfire.job USING btree (statename) INCLUDE (id) WHERE (statename IS NOT NULL);
 ;   DROP INDEX hangfire.ix_hangfire_job_statename_is_not_null;
       hangfire            postgres    false    222    222    222                       1259    25900 %   ix_hangfire_jobparameter_jobidandname    INDEX     g   CREATE INDEX ix_hangfire_jobparameter_jobidandname ON hangfire.jobparameter USING btree (jobid, name);
 ;   DROP INDEX hangfire.ix_hangfire_jobparameter_jobidandname;
       hangfire            postgres    false    233    233                       1259    26045 *   ix_hangfire_jobqueue_fetchedat_queue_jobid    INDEX     �   CREATE INDEX ix_hangfire_jobqueue_fetchedat_queue_jobid ON hangfire.jobqueue USING btree (fetchedat NULLS FIRST, queue, jobid);
 @   DROP INDEX hangfire.ix_hangfire_jobqueue_fetchedat_queue_jobid;
       hangfire            postgres    false    226    226    226            	           1259    25860 "   ix_hangfire_jobqueue_jobidandqueue    INDEX     a   CREATE INDEX ix_hangfire_jobqueue_jobidandqueue ON hangfire.jobqueue USING btree (jobid, queue);
 8   DROP INDEX hangfire.ix_hangfire_jobqueue_jobidandqueue;
       hangfire            postgres    false    226    226            
           1259    25968 &   ix_hangfire_jobqueue_queueandfetchedat    INDEX     i   CREATE INDEX ix_hangfire_jobqueue_queueandfetchedat ON hangfire.jobqueue USING btree (queue, fetchedat);
 <   DROP INDEX hangfire.ix_hangfire_jobqueue_queueandfetchedat;
       hangfire            postgres    false    226    226            
           1259    25979    ix_hangfire_list_expireat    INDEX     P   CREATE INDEX ix_hangfire_list_expireat ON hangfire.list USING btree (expireat);
 /   DROP INDEX hangfire.ix_hangfire_list_expireat;
       hangfire            postgres    false    228                       1259    25999    ix_hangfire_set_expireat    INDEX     N   CREATE INDEX ix_hangfire_set_expireat ON hangfire.set USING btree (expireat);
 .   DROP INDEX hangfire.ix_hangfire_set_expireat;
       hangfire            postgres    false    231                       1259    25914    ix_hangfire_set_key_score    INDEX     Q   CREATE INDEX ix_hangfire_set_key_score ON hangfire.set USING btree (key, score);
 /   DROP INDEX hangfire.ix_hangfire_set_key_score;
       hangfire            postgres    false    231    231                       1259    25813    ix_hangfire_state_jobid    INDEX     L   CREATE INDEX ix_hangfire_state_jobid ON hangfire.state USING btree (jobid);
 -   DROP INDEX hangfire.ix_hangfire_state_jobid;
       hangfire            postgres    false    224            &           1259    26292 
   EmailIndex    INDEX     S   CREATE INDEX "EmailIndex" ON public."AspNetUsers" USING btree ("NormalizedEmail");
     DROP INDEX public."EmailIndex";
       public            postgres    false    239            .           1259    26287    IX_AspNetRoleClaims_RoleId    INDEX     _   CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON public."AspNetRoleClaims" USING btree ("RoleId");
 0   DROP INDEX public."IX_AspNetRoleClaims_RoleId";
       public            postgres    false    245            1           1259    26289    IX_AspNetUserClaims_UserId    INDEX     _   CREATE INDEX "IX_AspNetUserClaims_UserId" ON public."AspNetUserClaims" USING btree ("UserId");
 0   DROP INDEX public."IX_AspNetUserClaims_UserId";
       public            postgres    false    247            4           1259    26290    IX_AspNetUserLogins_UserId    INDEX     _   CREATE INDEX "IX_AspNetUserLogins_UserId" ON public."AspNetUserLogins" USING btree ("UserId");
 0   DROP INDEX public."IX_AspNetUserLogins_UserId";
       public            postgres    false    248            7           1259    26291    IX_AspNetUserRoles_RoleId    INDEX     ]   CREATE INDEX "IX_AspNetUserRoles_RoleId" ON public."AspNetUserRoles" USING btree ("RoleId");
 /   DROP INDEX public."IX_AspNetUserRoles_RoleId";
       public            postgres    false    249            L           1259    26294    IX_CartItems_CartId    INDEX     Q   CREATE INDEX "IX_CartItems_CartId" ON public."CartItems" USING btree ("CartId");
 )   DROP INDEX public."IX_CartItems_CartId";
       public            postgres    false    262            M           1259    26295    IX_CartItems_ProductId    INDEX     W   CREATE INDEX "IX_CartItems_ProductId" ON public."CartItems" USING btree ("ProductId");
 ,   DROP INDEX public."IX_CartItems_ProductId";
       public            postgres    false    262            <           1259    26296    IX_Carts_UserId    INDEX     P   CREATE UNIQUE INDEX "IX_Carts_UserId" ON public."Carts" USING btree ("UserId");
 %   DROP INDEX public."IX_Carts_UserId";
       public            postgres    false    252            P           1259    26297    IX_ProductDescImages_ProductId    INDEX     g   CREATE INDEX "IX_ProductDescImages_ProductId" ON public."ProductDescImages" USING btree ("ProductId");
 4   DROP INDEX public."IX_ProductDescImages_ProductId";
       public            postgres    false    264            S           1259    26298    IX_ProductImages_ProductId    INDEX     _   CREATE INDEX "IX_ProductImages_ProductId" ON public."ProductImages" USING btree ("ProductId");
 0   DROP INDEX public."IX_ProductImages_ProductId";
       public            postgres    false    266            ?           1259    26299    IX_RefreshTokens_UserId    INDEX     Y   CREATE INDEX "IX_RefreshTokens_UserId" ON public."RefreshTokens" USING btree ("UserId");
 -   DROP INDEX public."IX_RefreshTokens_UserId";
       public            postgres    false    254            Z           1259    26306    IX_WishListItems_ProductId    INDEX     _   CREATE INDEX "IX_WishListItems_ProductId" ON public."WishListItems" USING btree ("ProductId");
 0   DROP INDEX public."IX_WishListItems_ProductId";
       public            postgres    false    270            V           1259    26300    IX_tblOrderItems_OrderId    INDEX     [   CREATE INDEX "IX_tblOrderItems_OrderId" ON public."tblOrderItems" USING btree ("OrderId");
 .   DROP INDEX public."IX_tblOrderItems_OrderId";
       public            postgres    false    268            W           1259    26301    IX_tblOrderItems_ProductId    INDEX     _   CREATE INDEX "IX_tblOrderItems_ProductId" ON public."tblOrderItems" USING btree ("ProductId");
 0   DROP INDEX public."IX_tblOrderItems_ProductId";
       public            postgres    false    268            B           1259    26302    IX_tblOrders_DiscountId    INDEX     Y   CREATE INDEX "IX_tblOrders_DiscountId" ON public."tblOrders" USING btree ("DiscountId");
 -   DROP INDEX public."IX_tblOrders_DiscountId";
       public            postgres    false    256            C           1259    26303    IX_tblOrders_UserId    INDEX     Q   CREATE INDEX "IX_tblOrders_UserId" ON public."tblOrders" USING btree ("UserId");
 )   DROP INDEX public."IX_tblOrders_UserId";
       public            postgres    false    256            I           1259    26304    IX_tblProducts_SubCategoryId    INDEX     c   CREATE INDEX "IX_tblProducts_SubCategoryId" ON public."tblProducts" USING btree ("SubCategoryId");
 2   DROP INDEX public."IX_tblProducts_SubCategoryId";
       public            postgres    false    260            F           1259    26305    IX_tblSubCategories_CategoryId    INDEX     g   CREATE INDEX "IX_tblSubCategories_CategoryId" ON public."tblSubCategories" USING btree ("CategoryId");
 4   DROP INDEX public."IX_tblSubCategories_CategoryId";
       public            postgres    false    258            %           1259    26288 
   RoleNameIndex    INDEX     \   CREATE UNIQUE INDEX "RoleNameIndex" ON public."AspNetRoles" USING btree ("NormalizedName");
 #   DROP INDEX public."RoleNameIndex";
       public            postgres    false    238            )           1259    26293 
   UserNameIndex    INDEX     `   CREATE UNIQUE INDEX "UserNameIndex" ON public."AspNetUsers" USING btree ("NormalizedUserName");
 #   DROP INDEX public."UserNameIndex";
       public            postgres    false    239            ^           2606    25837 $   jobparameter jobparameter_jobid_fkey 
   FK CONSTRAINT     �   ALTER TABLE ONLY hangfire.jobparameter
    ADD CONSTRAINT jobparameter_jobid_fkey FOREIGN KEY (jobid) REFERENCES hangfire.job(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY hangfire.jobparameter DROP CONSTRAINT jobparameter_jobid_fkey;
       hangfire          postgres    false    222    233    4868            ]           2606    25814    state state_jobid_fkey 
   FK CONSTRAINT     �   ALTER TABLE ONLY hangfire.state
    ADD CONSTRAINT state_jobid_fkey FOREIGN KEY (jobid) REFERENCES hangfire.job(id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY hangfire.state DROP CONSTRAINT state_jobid_fkey;
       hangfire          postgres    false    222    224    4868            _           2606    26091 7   AspNetRoleClaims FK_AspNetRoleClaims_AspNetRoles_RoleId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetRoleClaims"
    ADD CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES public."AspNetRoles"("Id") ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."AspNetRoleClaims" DROP CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId";
       public          postgres    false    238    4900    245            `           2606    26104 7   AspNetUserClaims FK_AspNetUserClaims_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserClaims"
    ADD CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."AspNetUserClaims" DROP CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId";
       public          postgres    false    247    239    4904            a           2606    26116 7   AspNetUserLogins FK_AspNetUserLogins_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserLogins"
    ADD CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."AspNetUserLogins" DROP CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId";
       public          postgres    false    4904    239    248            b           2606    26128 5   AspNetUserRoles FK_AspNetUserRoles_AspNetRoles_RoleId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES public."AspNetRoles"("Id") ON DELETE CASCADE;
 c   ALTER TABLE ONLY public."AspNetUserRoles" DROP CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId";
       public          postgres    false    4900    249    238            c           2606    26133 5   AspNetUserRoles FK_AspNetUserRoles_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 c   ALTER TABLE ONLY public."AspNetUserRoles" DROP CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId";
       public          postgres    false    4904    249    239            d           2606    26145 7   AspNetUserTokens FK_AspNetUserTokens_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."AspNetUserTokens"
    ADD CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."AspNetUserTokens" DROP CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId";
       public          postgres    false    239    250    4904            k           2606    26226 #   CartItems FK_CartItems_Carts_CartId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "FK_CartItems_Carts_CartId" FOREIGN KEY ("CartId") REFERENCES public."Carts"("CartId") ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "FK_CartItems_Carts_CartId";
       public          postgres    false    4926    262    252            l           2606    26231 ,   CartItems FK_CartItems_tblProducts_ProductId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "FK_CartItems_tblProducts_ProductId" FOREIGN KEY ("ProductId") REFERENCES public."tblProducts"("Id") ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "FK_CartItems_tblProducts_ProductId";
       public          postgres    false    262    260    4939            e           2606    26158 !   Carts FK_Carts_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "FK_Carts_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "FK_Carts_AspNetUsers_UserId";
       public          postgres    false    252    4904    239            m           2606    26242 <   ProductDescImages FK_ProductDescImages_tblProducts_ProductId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."ProductDescImages"
    ADD CONSTRAINT "FK_ProductDescImages_tblProducts_ProductId" FOREIGN KEY ("ProductId") REFERENCES public."tblProducts"("Id");
 j   ALTER TABLE ONLY public."ProductDescImages" DROP CONSTRAINT "FK_ProductDescImages_tblProducts_ProductId";
       public          postgres    false    264    260    4939            n           2606    26253 4   ProductImages FK_ProductImages_tblProducts_ProductId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."ProductImages"
    ADD CONSTRAINT "FK_ProductImages_tblProducts_ProductId" FOREIGN KEY ("ProductId") REFERENCES public."tblProducts"("Id") ON DELETE CASCADE;
 b   ALTER TABLE ONLY public."ProductImages" DROP CONSTRAINT "FK_ProductImages_tblProducts_ProductId";
       public          postgres    false    266    260    4939            f           2606    26171 1   RefreshTokens FK_RefreshTokens_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."RefreshTokens" DROP CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId";
       public          postgres    false    239    254    4904            q           2606    26282 4   WishListItems FK_WishListItems_tblProducts_ProductId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."WishListItems"
    ADD CONSTRAINT "FK_WishListItems_tblProducts_ProductId" FOREIGN KEY ("ProductId") REFERENCES public."tblProducts"("Id") ON DELETE CASCADE;
 b   ALTER TABLE ONLY public."WishListItems" DROP CONSTRAINT "FK_WishListItems_tblProducts_ProductId";
       public          postgres    false    270    4939    260            o           2606    26264 0   tblOrderItems FK_tblOrderItems_tblOrders_OrderId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblOrderItems"
    ADD CONSTRAINT "FK_tblOrderItems_tblOrders_OrderId" FOREIGN KEY ("OrderId") REFERENCES public."tblOrders"("OrderId") ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public."tblOrderItems" DROP CONSTRAINT "FK_tblOrderItems_tblOrders_OrderId";
       public          postgres    false    256    268    4933            p           2606    26269 4   tblOrderItems FK_tblOrderItems_tblProducts_ProductId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblOrderItems"
    ADD CONSTRAINT "FK_tblOrderItems_tblProducts_ProductId" FOREIGN KEY ("ProductId") REFERENCES public."tblProducts"("Id") ON DELETE RESTRICT;
 b   ALTER TABLE ONLY public."tblOrderItems" DROP CONSTRAINT "FK_tblOrderItems_tblProducts_ProductId";
       public          postgres    false    268    4939    260            g           2606    26184 )   tblOrders FK_tblOrders_AspNetUsers_UserId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblOrders"
    ADD CONSTRAINT "FK_tblOrders_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."tblOrders" DROP CONSTRAINT "FK_tblOrders_AspNetUsers_UserId";
       public          postgres    false    239    4904    256            h           2606    26189 +   tblOrders FK_tblOrders_Discounts_DiscountId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblOrders"
    ADD CONSTRAINT "FK_tblOrders_Discounts_DiscountId" FOREIGN KEY ("DiscountId") REFERENCES public."Discounts"("DiscountId") ON DELETE SET NULL;
 Y   ALTER TABLE ONLY public."tblOrders" DROP CONSTRAINT "FK_tblOrders_Discounts_DiscountId";
       public          postgres    false    241    256    4907            j           2606    26215 9   tblProducts FK_tblProducts_tblSubCategories_SubCategoryId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblProducts"
    ADD CONSTRAINT "FK_tblProducts_tblSubCategories_SubCategoryId" FOREIGN KEY ("SubCategoryId") REFERENCES public."tblSubCategories"("SubCategoryId") ON DELETE CASCADE;
 g   ALTER TABLE ONLY public."tblProducts" DROP CONSTRAINT "FK_tblProducts_tblSubCategories_SubCategoryId";
       public          postgres    false    260    4936    258            i           2606    26202 =   tblSubCategories FK_tblSubCategories_tblCategories_CategoryId 
   FK CONSTRAINT     �   ALTER TABLE ONLY public."tblSubCategories"
    ADD CONSTRAINT "FK_tblSubCategories_tblCategories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES public."tblCategories"("CategoryId") ON DELETE CASCADE;
 k   ALTER TABLE ONLY public."tblSubCategories" DROP CONSTRAINT "FK_tblSubCategories_tblCategories_CategoryId";
       public          postgres    false    243    258    4909               
   x������ � �         
   x������ � �         =  x����n�0�g�)��U�Ch��F�*��2P:�䀴��.6U}�:�R�t�Ϸ�����9"�A,�����ju���X"�!4�L}�lԖ<0@
�	Si����N��$�g������YY�ZI��%KaЉ��g�]�$���m�Xԑ�
�N�܉:�2R7K�S�C��Q��
�)�E����]�AI0E�s����.��#i�*�'�U���۴��@Q���m����VǸ75XK����w���&���x����.��?�|8�x�֎<�D��YOζA۽��c��R����}E�k�P��@-�         
   x������ � �         
   x������ � �         
   x������ � �      
   
   x������ � �         
   x������ � �            x�32����� �         �   x�E��
�0F��)�]5��&i�l�����P�di�PA�w7�?�9��痓B��p0�KO\/�R���T;C�����!����+��<%�ok8�~I��R!@H�#q�'a�ؔTJ_���yò��c�	�տ�I8mעk%Z�A�������+�         L   x�3�,JM.-*��K���O*�4471065520�J��/Ku�(�,JM	JM+J-���N�+��O���4������ ��/      	   
   x������ � �         
   x������ � �         
   x������ � �          
   x������ � �      !   
   x������ � �      "   
   x������ � �      #   
   x������ � �         
   x������ � �      /   
   x������ � �      %   
   x������ � �         
   x������ � �      1   
   x������ � �      3   
   x������ � �      '   
   x������ � �      7   
   x������ � �         '   x�320250226�4231�OLII��3�3������ m$h         
   x������ � �      5   
   x������ � �      )   
   x������ � �      -   
   x������ � �      +   
   x������ � �     