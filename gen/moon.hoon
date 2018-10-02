::  Generate random moon and corresponding ticket
::
::::  /hoon/moon/gen
  ::
/?    310
/+  sole, old-zuse
=,  old-zuse
=,  ask:sole
::
::::
  ::
:-  %ask
|=  $:  {now/@da eny/@uvJ bec/beak}
        ~
        ~
    ==
=/  ran  (clan p.bec)
?:  ?=({?($earl $pawn)} ran)
  %-  output
  :-  %tang  :_  ~
  leaf+"can't create a moon from a {?:(?=($earl ran) "moon" "comet")}"
=/  mon  (mix (lsh 5 1 (end 5 1 eny)) p.bec)
=/  tic  .^(@ /a/(scot %p p.bec)/tick/(scot %da now)/(scot %p mon))
(output [%tang leaf+"ticket: {<`@p`tic>}" leaf+"moon: {<`@p`mon>}" ~])
