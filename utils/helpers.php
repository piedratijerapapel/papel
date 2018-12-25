<?php
require_once 'Flickr.php';

function getAllImages($flickr, $arr, $rawTags, $perPage, $page) {
  $flickrReq = $flickr->people_getPhotos('me', array(
    'per_page' => $perPage,
    'page' => $page,
    'extras' => 'description,tags,url_o,o_dims',
  ));

  if ($flickrReq['stat'] == 'ok') {
    foreach ($flickrReq['photos']['photo'] as $key => $photo) {
      $tags = explode(' ', $photo['tags']);

      foreach ($tags as $i => $tag) {
        $tags[$i] = array_key_exists($tag, $rawTags) ? $rawTags[$tag] : $tag;
      }
      $flickrReq['photos']['photo'][$key]['tags'] = $tags;
    }

    if ($flickrReq['photos']['page'] < $flickrReq['photos']['pages']) {
      $arr = array_merge($arr, $flickrReq['photos']['photo']);
      return getAllImages($flickr, $arr, $rawTags, $perPage, ++$flickrReq['photos']['page']);
    } else {
      $arr = array_merge($arr, $flickrReq['photos']['photo']);
      return $arr;
    }
  }
}

function mapNumber($num, $in_min, $in_max, $out_min, $out_max) {
  return ($num - $in_min) * ($out_max - $out_min) / ($in_max - $in_min) + $out_min;
}

function normalize($string) {
  $table = array(
    'Š' => 'S', 'š' => 's', 'Đ' => 'Dj', 'đ' => 'dj', 'Ž' => 'Z', 'ž' => 'z', 'Č' => 'C', 'č' => 'c', 'Ć' => 'C', 'ć' => 'c',
    'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'A', 'Ç' => 'C', 'È' => 'E', 'É' => 'E',
    'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O',
    'Õ' => 'O', 'Ö' => 'O', 'Ø' => 'O', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ý' => 'Y', 'Þ' => 'B', 'ß' => 'Ss',
    'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'a', 'ç' => 'c', 'è' => 'e', 'é' => 'e',
    'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ð' => 'o', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o',
    'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ý' => 'y', 'ý' => 'y', 'þ' => 'b',
    'ÿ' => 'y', 'Ŕ' => 'R', 'ŕ' => 'r',
  );

  return strtr($string, $table);
}

function getFlickrData($Automad) {
  $file = realpath(__DIR__ . '/../_data/cacheflickr.json');
  $Page = $Automad->Context->get();
  $cached = file_get_contents($file);

  if (empty($cached)) {
    $apiKey = $Page->Shared->data['flickr_api_key'];
    $apiSecret = $Page->Shared->data['flickr_api_secret'];
    $flickr = new Flickr($apiKey, $apiSecret);

    $logedIn = $flickr->requestOauthToken();

    if ($logedIn) {
      $rawTagsReq = $flickr->tags_getListUserRaw();
      $rawTags = array();

      if ($rawTagsReq['stat'] == 'ok') {
        foreach ($rawTagsReq['who']['tags']['tag'] as $tag) {
          $rawTags[$tag['clean']] = $tag['raw'][0];
        }
      }
      $imgs = getAllImages($flickr, array(), $rawTags, 200, 1);
      $json = json_encode($imgs);
      $cached .= $imgs;
      file_put_contents($file, $json);
      return $json;
    }
  } else {
    return $cached;
  }
}
