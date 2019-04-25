{ name =
    "uterm"
, version =
    "0.1.0"
, license =
    "AGPL-3.0-only"
, default-extensions =
    [ "OverloadedStrings"
    , "TypeApplications"
    , "UnicodeSyntax"
    , "FlexibleContexts"
    , "TemplateHaskell"
    , "QuasiQuotes"
    , "LambdaCase"
    , "NoImplicitPrelude"
    , "ScopedTypeVariables"
    , "DeriveAnyClass"
    , "DeriveGeneric"
    ]
, dependencies =
    [ "base"
    , "classy-prelude"
    , "lens"
    ]
, executables =
    { pomo = { main = "Main.hs" } }
}
