/*!
 * Extracted from RFC 6838
 */

/**
 * 4.2. Naming Requirements
 */

type_name
  = name:restricted_name
{
  return name.toLowerCase()
}

subtype_name
  = name:$( restricted_name_first ( restricted_name_chars / "." / "+" )* )
{
  return name.toLowerCase()
}

restricted_name
  = $( restricted_name_first restricted_name_chars* )

restricted_name_first
  = DIGIT / ALPHA

restricted_name_chars
  = ALPHA / DIGIT / "!" / "#" / "$" / "&" / "-" / "^" / "_"
