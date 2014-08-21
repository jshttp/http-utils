/*!
 * Extracted from RFC 7231
 */

/**
 * 3.1.1.1. Media Type
 */

media_type
  = type:type "/" subtype:subtype parameters:parameters?
{
  return {
    type: type,
    subtype: subtype,
    parameters: parameters || {}
  }
}

type
  = type_name

subtype
  = subtype_name

parameter
  = key:token "=" value:( token / quoted_string )
{
  return [key, value]
}

parameters
  = params:( OWS ";" OWS ! "q=" param:parameter { return param } ) +
{
  var parameters = {}

  for (var i = 0, length = params.length; i < length; i++) {
    var param = params[i]
    var name = param[0].toLowerCase()
    var value = param[1]

    if (!(name in parameters)) {
      parameters[name] = value
    }
  }

  return parameters
}

/**
 * 3.1.1.5. Content-Type
 */

Content_Type
  = media_type

/**
 * 5.3.1. Quality Values
 */

weight
  = OWS ";" OWS "q=" weight:qvalue
{
  return weight
}

qvalue
  = ( ( "0" ( "." DIGIT? DIGIT? DIGIT? )? )
    / ( "1" ( "." "0"? "0"? "0"? )? ) )
{
  return Number(text())
}

/**
 * 5.3.2. Accept
 */

Accept = accept:Accept_Leading list:Accept_List*
{
  list.unshift(accept)

  return list
}

Accept_Leading
  = ( "," OWS )* range:Accept_Media
{
  return range
}

Accept_Media
  = range:media_range params:accept_params?
{
  for (var key in params) {
    if (!(key in range)) {
      range[key] = params[key]
    }
  }

  range.extensions = range.extensions || {}

  if (!('weight' in range)) {
    range.weight = 1
  }

  return range
}

Accept_List
  = OWS "," range:Accept_Range?
{
  return range
}

Accept_Range
  = OWS range:Accept_Media
{
  return range
}

media_range
  = mediaRange:( media_range_type / media_range_any ) params:parameters?
{
  mediaRange.parameters = params || {}

  return mediaRange
}

media_range_any
  = "*/*"
{
  return {
    type: "*",
    subtype: "*"
  }
}

media_range_type
  = type:type "/" subtype:( "*" / subtype )
{
  return {
    type: type,
    subtype: subtype
  }
}

accept_params
  = weight:weight exts:accept_ext *
{
  var extensions = {}

  for (var i = 0, length = exts.length; i < length; i++) {
    var ext = exts[i]
    var name = ext[0]
    var value = ext[1]

    if (!(name in extensions)) {
      extensions[name] = value
    }
  }

  return {
    weight: weight,
    extensions: extensions
  }
}

accept_ext
  = OWS ";" OWS name:token value:accept_ext_value?
{
  return [name, (value || undefined)]
}

accept_ext_value
  = "=" value:( token / quoted_string )
{
  return value
}

/**
 * 5.3.3. Accept-Charset
 */

/**
 * 7.1.1.1. Date/Time Formats
 */

year
  = DIGIT DIGIT DIGIT DIGIT
{
  return Number(text())
}
