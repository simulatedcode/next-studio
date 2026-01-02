import { groq } from 'next-sanity'

export const STUDIO_QUERY = groq`*[_type == "studio"] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  publishedAt
}`

export const STUDIO_ITEM_QUERY = groq`*[_type == "studio" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  body
}`

export const WORK_QUERY = groq`*[_type == "work"] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  publishedAt
}`

export const WORK_ITEM_QUERY = groq`*[_type == "work" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  body,
  publishedAt
}`

export const PROCESS_QUERY = groq`*[_type == "process"] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  publishedAt
}`

export const PROCESS_ITEM_QUERY = groq`*[_type == "process" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  body,
  publishedAt
}`

export const ARCHIVE_QUERY = groq`*[_type == "archive"] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  publishedAt,
  "categories": categories[]->title,
  artistName,
  instagramUrl
}`

export const ARCHIVE_ITEM_QUERY = groq`*[_type == "archive" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  content,
  body
}`
