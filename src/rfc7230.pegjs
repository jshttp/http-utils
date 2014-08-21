/*!
 * Extracted from RFC 7230
 */

token
  = $tchar+

tchar
  = "!" / "#" / "$" / "%" / "&" / "'" / "*"
  / "+" / "-" / "." / "^" / "_" / "`" / "|"
  / "~" / DIGIT / ALPHA

quoted_string 
  = DQUOTE text:( qdtext / quoted_pair )* DQUOTE
{
  return text.join('')
}

qdtext
  = HTAB / SP / obs_text
  / [\x21\x23-\x5B\x5D-\x7E]

obs_text
  = [\x80-\xFF]

comment
  = "(" ( ctext / quoted_pair / comment )* ")"

ctext
  = HTAB / SP / obs_text
  / [\x21-\x27\x2A-\x5B\x5D-\x7E]

quoted_pair
  = "\\" char:$( HTAB / SP / VCHAR / obs_text )
{
  return char
}

OWS
  = $( SP / HTAB )*

RWS
  = $( SP / HTAB )+

BWS
  = OWS

/**
 * 3.2. Header Fields
 */

header_field
  = field_name ":" OWS field_value OWS

field_name
  = field:token
{
  return field.toLowerCase()
    .replace(/(^|-)[a-z]/g, function (c) { return c.toUpperCase() })
}

field_value
  = ( field_content / obs_fold )*

field_content
  = field_vchar ( ( SP / HTAB )+ field_vchar )?

field_vchar
  = VCHAR / obs_text

obs_fold
  = CRLF ( SP / HTAB )+
