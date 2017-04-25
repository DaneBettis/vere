::
::::  /hoon/report/talk/mar
  ::
/?    310
/-    talk
/+    talk
!:
[talk .]
|_  rep/report
::
++  grab                                                ::  convert from
  |%
  ++  noun  report                                      ::  clam from %noun
  --
++  grow
  |%
  ++  mime  [/text/json (taco (crip (pojo json)))]
  ++  json
    =>  +
    |^  %+  joba  -.rep
        ?-  -.rep
          $cabal  (cabl cab.rep)
          $grams  (jobe num+(jone num.rep) tele+[%a (turn gaz.rep gram)] ~)
          $group  %^    jobe
                      local+(grop loc.reg.rep)
                    global+%.(rem.reg.rep (jome parn grop))
                  ~
        ==
    ++  joce  |=(a/knot [%s a])
    ::
    ++  jove
      |=  {a/envelope b/delivery}
      %-  jobe  :~
        envelope+(jobe visible+[%b vis.a] sender+?~(sen.a ~ s+(parn u.sen.a)) ~)
        delivery+[%s b]
      ==
    ++  jope  |=(a/ship (jape +:<a>)) ::[%s (crip +:(scow %p a))])
    ++  joke  |=(a/tank [%s (role (turn (wash 0^80 a) crip))])
    ++  jode  |=(a/time (jone (div (mul (sub a ~1970.1.1) 1.000) ~s1)))
    ++  jome                                            ::  stringify keys
      |*  {a/_cord b/_json}
      |=  c/(map _+<.a _+<.b)
      (jobe (turn (~(tap by c)) (both a b)))
    ::
    ++  both                                            ::  cons two gates
      |*  {a/_* b/_*}
      |=(c/_[+<.a +<.b] [(a -.c) (b +.c)])
    ::
    ::
    ++  nack  |=(a/(set (set partner)) [%a (turn (~(tap in a)) sorc)])
    ++  grop  (jome phon stas)                          ::  (map ship status)
    ++  phon  |=(a/ship (scot %p a))
    ++  stas  |=(status (jobe presence+(joce pec) human+(huma man) ~))
    ++  gram  |=(telegram (jobe ship+(jope aut) thought+(thot tot) ~))
    ++  thot
      |=  thought
      (jobe serial+(jape <uid>) audience+(audi aud) statement+(stam sam) ~)
    ::
    ++  audi  (jome parn jove)
    ++  bouq
      |=  a/bouquet
      a+(turn (~(tap in a)) |=(b/path a+(turn b |=(c/knot s+c))))
    ::
    ++  parn
      |=  a/partner  ^-  cord
      ?-  -.a
        $&  (circ p.a)
        $|  %-  crip
            ?-  -.p.a
              $twitter  "{(trip -.p.a)}/{(trip p.p.a)}"
            ==
      ==
    ::
    ++  circ
      |=  a/circle  ^-  cord
      (crip "{<hos.a>}/{(trip nom.a)}")
    ::
    ++  stam
      |=  statement
      (jobe date+(jode wen) bouquet+(bouq boq) speech+(spec sep) ~)
    ::
    ++  spec
      |=  a/speech
      %+  joba  -.a
      ?+  -.a  ~|(stub+-.a !!)
        $lin  (jobe txt+[%s msg.a] say+[%b pat.a] ~)
        $url  (joba txt+[%s (crip (earf url.a))])
        $exp  (joba txt+[%s exp.a])
        $fat  (jobe tor+(tors tac.a) taf+$(a sep.a) ~)
        $mor  a+(turn ses.a spec)
        $app  (jobe txt+[%s msg.a] src+[%s app.a] ~)
        $api
          %-  jobe  :~
            service+s+service.a
            id+s+id.a
            id-url+s+(crip (earf id-url.a))
            summary+s+summary.a
            body+s+body.a
            url+s+(crip (earf url.a))
            meta+meta.a
          ==
        ::  %inv  (jobe ship+(jope p.a) party+[%s q.a] ~)
      ==
    ::
    ++  tors
      |=  a/torso
      %+  joba  -.a
      ?-  -.a
        $text  [%s (role +.a)]
        $tank  [%a (turn +.a joke)]
        $name  (jobe nom+s+nom.a mon+$(a tac.a) ~)
      ==
    ::
    ++  huma
      |=  human
      %^  jobe
        hand+?~(han ~ [%s u.han])
        :-  %true
        ?~  tru  ~
        =+  u.tru
        (jobe first+[%s p] middle+?~(q ~ [%s u.q]) last+[%s r] ~)
      ~
    ::
    ++  cabl
      |=  cabal
      %-  jobe  :~
        loc+(conf loc)
        ham+((jome circ conf) rem)
      ==
    ::
    ++  sorc
      |=  a/(set partner)  ^-  json
      [%a (turn (~(tap in a)) |=(b/partner s+(parn b)))]
    ::
    ++  conf
      |=  config
      %-  jobe  :~
        sources+(sorc src)
        caption+[%s cap]
        =-  cordon+(jobe posture+[%s -.con] list+[%a -] ~)
        (turn (~(tap in ses.con)) jope)                ::  XX  jase
      ==
  --
--  --
