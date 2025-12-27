---
# any unused 

# general information about the person
# should be defined, otherwise page might not work properly
# if necessary, these information can be overwritten for specific section(s) using `pages` property
name: "Name" # only mandatory property

# use only existing images, otherwise, page looks bad
image: "" # /imgs/people/xxx.jpg

nickname: ""
description: ""

# optional
degreesBeforeName: ""
degreesAfterName: ""

# whether the person is no longer participating in Bestvina preparation
# not required [default: false]
isFormer: "false"

# hide from all lists 
# not required [default: false]
isHidden: "false"

# property using which content at each 'people page' can be overwrriten
# if not defined, information from above will be used

# role: one of following - ["prednasejici" | "laborant" | "host" | "zdravotnik" | "administrativa" | "ostatni"]
pages:
  aktivni_vsichni:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
  aktivni_chemie:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
  aktivni_biologie:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
  aktivni_ostatni:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
  externi:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
  former:
    role: ""
    roleTitle: ""
    description: ""
    name: ""
    nickname: ""
---
[//]: # (here, personal website can be defined using Markdown, that will be rendered with MDC)
[//]: # (this is not yet implemented, tho)