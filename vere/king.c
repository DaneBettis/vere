#include <unistd.h>
#include <uv.h>
#include "all.h"
#include "vere/vere.h"

/*
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  wyrd: requires auth to a single relevant ship       ::
::  doom: requires auth to the daemon itself            ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
++  fate                                                ::  client to lord
  $%  $:  $auth                                         ::  authenticate client
          p/(unit ship)                                 ::  what to auth
          q/@                                           ::  auth secret
      ==                                                ::
  $%  $:  $wyrd                                         ::  ship action
          p/ship                                        ::  which ship
          q/wyrd                                        ::  the action
      ==                                                ::
      $:  $doom                                         ::  daemon command
          p/doom                                        ::  the command
      ==                                                ::
  ==                                                    ::
::                                                      ::
++  wyrd                                                ::  ship action
  $%  $:  $susp                                         ::  release this pier
          $~                                            ::
      ==                                                ::
      $:  $vent                                         ::  generate event
          p/ovum                                        ::  wire and card
      ==                                                ::
  ==                                                    ::
::                                                      ::
++  doom                                                ::  daemon command
  $%  $:  $boot                                         ::  boot new pier
          who/ship                                      ::  ship
          tic/@                                         ::  ticket (or 0)
          sec/@                                         ::  secret (or 0)
          pax/@t                                        ::  directory
          sys/@                                         ::  boot pill
      ==                                                ::
      $:  $exit                                         ::  end the daemon
          $~                                            ::
      ==                                                ::
      $:  $pier                                         ::  acquire a pier
          p/(unit @t)                                   ::  unix path
      ==                                                ::
      $:  $root                                         ::  admin ship actions
          p/ship                                        ::  which ship
          q/wyrd                                        ::  the action
  ==                                                    ::
++  cede                                                ::  lord to client
  $%  $:  $cede                                         ::  send cards
          p/ship                                        ::  sending ship
          q/(list ovum)                                 ::  actions
      ==                                                ::
      $:  $firm                                         ::  accept command
          $~                                            ::
      ==                                                ::
      $:  $deny                                         ::  reject command
          p/@t                                          ::  error message
      ==                                                ::
  ==                                                    ::
::                                                      ::
*/

void _king_auth(u3_noun auth);

void _king_wyrd(u3_noun ship_wyrd);
  void _king_susp(u3_atom ship, u3_noun susp);
  void _king_vent(u3_atom ship, u3_noun vent);

void _king_doom(u3_noun doom);
  void _king_boot(u3_noun boot);
  void _king_exit(u3_noun exit);
  void _king_pier(u3_noun pier);
  void _king_root(u3_noun root);

/* _king_defy_fate(): invalid fate
*/
void
_king_defy_fate()
{
  exit(1);
}

/* _king_fate(): top-level fate parser
*/
void
_king_fate(void *vod_p, u3_noun mat)
{
  u3_noun fate = u3ke_cue(u3k(mat));
  u3_noun load;
  void (*next)(u3_noun);

  c3_assert(_(u3a_is_cell(fate)));
  c3_assert(_(u3a_is_cat(u3h(fate))));

  switch ( u3h(fate) ) {
    case c3__auth:
      next = _king_auth;
      break;
    case c3__wyrd:
      next = _king_wyrd;
      break;
    case c3__doom:
      next = _king_doom;
      break;
    default:
      _king_defy_fate();
  }

  load = u3k(u3t(fate));
  u3z(fate);
  next(load);
}

/* _king_auth(): auth parser
*/
void
_king_auth(u3_noun auth)
{
}

/* _king_wyrd(): wyrd parser
*/
void
_king_wyrd(u3_noun ship_wyrd)
{
  u3_atom ship;
  u3_noun wyrd;
  u3_noun load;
  void (*next)(u3_atom, u3_noun);

  c3_assert(_(u3a_is_cell(ship_wyrd)));
  c3_assert(_(u3a_is_atom(u3h(ship_wyrd))));
  ship = u3k(u3h(ship_wyrd));
  wyrd = u3k(u3t(ship_wyrd));
  u3z(ship_wyrd);

  c3_assert(_(u3a_is_cell(wyrd)));
  c3_assert(_(u3a_is_cat(u3h(wyrd))));

  switch ( u3h(wyrd) ) {
    case c3__susp:
      next = _king_susp;
      break;
    case c3__vent:
      next = _king_vent;
      break;
    default:
      _king_defy_fate();
  }

  load = u3k(u3t(wyrd));
  u3z(wyrd);
  next(ship, load);
}

/* _king_susp(): susp parser
*/
void
_king_susp(u3_atom ship, u3_noun susp)
{
}

/* _king_vent(): vent parser
*/
void
_king_vent(u3_atom ship, u3_noun vent)
{
  /* stub; have to find pier from ship */
  u3z(ship);
  u3_pier_work(u3_pier_stub(), u3h(vent), u3t(vent));
  u3z(vent);
}

/* _king_doom(): doom parser
*/
void
_king_doom(u3_noun doom)
{
  u3_noun load;
  void (*next)(u3_noun);

  c3_assert(_(u3a_is_cell(doom)));
  c3_assert(_(u3a_is_cat(u3h(doom))));

  u3m_p("doom", doom);

  switch ( u3h(doom) ) {
    case c3__boot:
      next = _king_boot;
      break;
    case c3__exit:
      next = _king_exit;
      break;
    case c3__pier:
      next = _king_pier;
      break;
    case c3__root:
      next = _king_root;
      break;
    default:
      _king_defy_fate();
  }

  load = u3k(u3t(doom));
  u3z(doom);
  next(load);
}

/* _king_boot(): boot parser
*/
void
_king_boot(u3_noun bul)
{
  u3_noun who, sec, tic, sys, pax;

  u3r_quil(bul, &who, &tic, &sec, &sys, &pax);
  u3_pier_boot(u3k(who), u3k(tic), u3k(sec), u3k(sys), u3k(pax));

  u3z(bul);
}

/* _king_exit(): exit parser
*/
void
_king_exit(u3_noun exit)
{
}

/* _king_pier(): pier parser
*/
void
_king_pier(u3_noun pier)
{
  if ( (c3n == u3du(pier)) ||
       (c3n == u3ud(u3t(pier))) ) {
    u3m_p("king: invalid pier", pier);
    exit(1);
  }

  u3_pier_stay(u3k(u3t(pier)));
  u3z(pier);
}

/* _king_root(): root parser
*/
void
_king_root(u3_noun root)
{
}

/* _king_bail(): bail for command socket newt
*/
void
_king_bail(u3_moor *vod_p, const c3_c *err_c)
{
  u3_moor *free_p;
  fprintf(stderr, "_king_bail: %s\r\n", err_c);
  if ( vod_p == 0 ) {
    free_p = u3K.cli_u;
    u3K.cli_u = u3K.cli_u->nex_u;
    u3a_free(free_p);
  } else {
    free_p = vod_p->nex_u;
    vod_p->nex_u = vod_p->nex_u->nex_u;
    u3a_free(free_p);
  }
}

/* _king_socket_connect(): callback for new connections
*/
void
_king_socket_connect(uv_stream_t *sock, int status)
{
  u3_moor *mor_u;
  if ( u3K.cli_u == 0 ) {
    u3K.cli_u = u3a_malloc(sizeof(u3_moor));
    mor_u = u3K.cli_u;
    mor_u->vod_p = 0;
    mor_u->nex_u = 0;
  } else {
    for (mor_u = u3K.cli_u; mor_u->nex_u; mor_u = mor_u->nex_u);
    mor_u->nex_u = u3a_malloc(sizeof(u3_moor));
    mor_u->nex_u->vod_p = mor_u;
    mor_u = mor_u->nex_u;
    mor_u->nex_u = 0;
  }

  uv_pipe_init(u3L, &mor_u->pyp_u, 0);
  mor_u->pok_f = _king_fate;
  mor_u->bal_f = (u3_bail)_king_bail;

  uv_accept(sock, (uv_stream_t *)&mor_u->pyp_u);
  u3_newt_read((u3_moat *)mor_u);
}

/* _boothack_cb(): callback for the boothack self-connection
*/
void
_boothack_cb(uv_connect_t *conn, int status)
{
  u3_mojo *moj_u = conn->data;
  u3_atom mat;
  u3_atom who, tic, sec, pax, sys;
  u3_noun dom;

  pax = u3i_string(u3_Host.dir_c);

  if ( c3n == u3_Host.ops_u.nuu ) {
    dom = u3nt(c3__pier, u3_nul, pax);
  }
  else {
    if ( !u3_Host.ops_u.pil_c ) {
      //  XX download default pill
      //
      fprintf(stderr, "boot: new ship must specify pill (-B)\r\n");
      exit(1);
    }
    else sys = u3i_string(u3_Host.ops_u.pil_c);

    {
      u3_noun whu;

      if ( !u3_Host.ops_u.who_c ) {
        fprintf(stderr, "boot: new ship must specify identity (-w)\r\n");
        exit(1);
      }
      whu = u3dc("slaw", 'p', u3i_string(u3_Host.ops_u.who_c));

      if ( u3_nul == whu ) {
        fprintf(stderr, "boot: malformed identity (-w)\r\n");
        exit(1);
      }
      who = u3k(u3t(whu));
      u3z(whu);
    }

    if ( c3y == u3_Host.ops_u.fak ) {
      fprintf(stderr, "boot: F A K E ship with null security\r\n");
      sec = 0;
      tic = 0;
    }
    else {
      fprintf(stderr, "boot: real ships not yet supported\r\n");
      exit(1);
    }

    dom = u3nc(c3__boot, u3nq(who, tic, sec, u3nc(pax, sys)));
  }

  mat = u3ke_jam(u3nc(c3__doom, dom));
  u3_newt_write(moj_u, mat, 0);
}

/* _king_loop_init(): stuff that comes before the event loop
*/
void
_king_loop_init()
{
  /* move signals out of unix.c */
  {
    u3_usig* sig_u;

    sig_u = c3_malloc(sizeof(u3_usig));
    uv_signal_init(u3L, &sig_u->sil_u);

    sig_u->num_i = SIGTERM;
    sig_u->nex_u = u3_Host.sig_u;
    u3_Host.sig_u = sig_u;
  }
  {
    u3_usig* sig_u;

    sig_u = c3_malloc(sizeof(u3_usig));
    uv_signal_init(u3L, &sig_u->sil_u);

    sig_u->num_i = SIGINT;
    sig_u->nex_u = u3_Host.sig_u;
    u3_Host.sig_u = sig_u;
  }
  {
    u3_usig* sig_u;

    sig_u = c3_malloc(sizeof(u3_usig));
    uv_signal_init(u3L, &sig_u->sil_u);

    sig_u->num_i = SIGWINCH;
    sig_u->nex_u = u3_Host.sig_u;
    u3_Host.sig_u = sig_u;
  }

  /* boot hack */
  {
    u3_moor *mor_u = c3_malloc(sizeof(u3_moor));
    uv_connect_t *conn = c3_malloc(sizeof(uv_connect_t));
    conn->data = mor_u;
    uv_pipe_init(u3L, &mor_u->pyp_u, 0);
    uv_pipe_connect(conn, &mor_u->pyp_u, u3K.soc_c, _boothack_cb);
  }
}

/* _king_loop_exit(): cleanup after event loop
*/
void
_king_loop_exit()
{
  /*  all needs to move extept unlink */
  c3_l cod_l;

  cod_l = u3a_lush(c3__unix);
  u3_unix_io_exit(u3_pier_stub());
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__ames);
  u3_ames_io_exit(u3_pier_stub());
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__term);
  u3_term_io_exit();
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__http);
  u3_http_io_exit();
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__cttp);
  u3_cttp_io_exit();
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__save);
  u3_save_io_exit(u3_pier_stub());
  u3a_lop(cod_l);

  cod_l = u3a_lush(c3__behn);
  u3_behn_io_exit(u3_pier_stub());
  u3a_lop(cod_l);

  unlink(u3K.soc_c);
}

/* u3_king_commence(): start the daemon
*/
void
u3_king_commence()
{
  u3_Host.lup_u = uv_default_loop();

  /* start up a "fast-compile" arvo for internal use only
  */
  u3m_boot_pier();
  {
    u3_noun lit;

    if ( 0 != u3_Host.ops_u.lit_c ) {
      lit = u3m_file(u3_Host.ops_u.lit_c);
    }
    else {
      extern c3_w u3_Ivory_length_w;
      extern c3_y u3_Ivory_pill_y[];

      lit = u3i_bytes(u3_Ivory_length_w, u3_Ivory_pill_y);
    }

    u3v_boot_lite(lit);
  }

  /* listen on command socket
  */
  {
    c3_c buf_c[256];

    sprintf(buf_c, "/tmp/urbit-sock-%d", getpid());
    u3K.soc_c = strdup(buf_c);
  }

  uv_pipe_init(u3L, &u3K.cmd_u, 0);
  uv_pipe_bind(&u3K.cmd_u, u3K.soc_c);
  uv_listen((uv_stream_t *)&u3K.cmd_u, 128, _king_socket_connect);
  fprintf(stderr, "cmd socket up\r\n");

  _king_loop_init();

  uv_run(u3L, UV_RUN_DEFAULT);

  _king_loop_exit();
  exit(0);
}
