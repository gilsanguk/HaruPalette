# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: palette_ai.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x10palette_ai.proto\x12\npalette_ai\"\x1d\n\x0c\x41udioRequest\x12\r\n\x05\x61udio\x18\x01 \x01(\x0c\"\x1b\n\x0bTextRequest\x12\x0c\n\x04text\x18\x01 \x01(\t\"\"\n\x0cTextResponse\x12\x12\n\nprediction\x18\x01 \x01(\t\"\x85\x01\n\x0f\x45motionResponse\x12\x0f\n\x07neutral\x18\x01 \x01(\x02\x12\r\n\x05happy\x18\x02 \x01(\x02\x12\x10\n\x08surprise\x18\x03 \x01(\x02\x12\r\n\x05\x61nger\x18\x04 \x01(\x02\x12\x0f\n\x07\x61nxiety\x18\x05 \x01(\x02\x12\x0f\n\x07sadness\x18\x06 \x01(\x02\x12\x0f\n\x07\x64isgust\x18\x07 \x01(\x02\x32\x9a\x01\n\tPaletteAI\x12\x44\n\x0cSpeechToText\x12\x18.palette_ai.AudioRequest\x1a\x18.palette_ai.TextResponse\"\x00\x12G\n\rTextToEmotion\x12\x17.palette_ai.TextRequest\x1a\x1b.palette_ai.EmotionResponse\"\x00\x42!\n\x11\x63om.ssafy.paletteB\x0cPaletteProtob\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'palette_ai_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\021com.ssafy.paletteB\014PaletteProto'
  _AUDIOREQUEST._serialized_start=32
  _AUDIOREQUEST._serialized_end=61
  _TEXTREQUEST._serialized_start=63
  _TEXTREQUEST._serialized_end=90
  _TEXTRESPONSE._serialized_start=92
  _TEXTRESPONSE._serialized_end=126
  _EMOTIONRESPONSE._serialized_start=129
  _EMOTIONRESPONSE._serialized_end=262
  _PALETTEAI._serialized_start=265
  _PALETTEAI._serialized_end=419
# @@protoc_insertion_point(module_scope)
