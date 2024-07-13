$(function () {
  // We need the user media throughout our code, so we store it in the outer scope.
  var userMedia;

  // This is @instagrames account ID, the Instagrammer that we're following for this coding assignment.
  var USER_ID = '17841403377586680';

  window.Instagram.getUser(USER_ID, function (userData) {
    renderUserInfo(userData);
  });

  window.Instagram.getUserRecentMedia(USER_ID, function (media) {
    userMedia = media;

    renderUserMedia(media);

    var tags = extractTagsFromMedia(media);

    var sortedTags = sortTagsByFrequencyDesc(tags);

    var filteredTags = filterTagsByMinFrequency(sortedTags, 2);

    renderTags(filteredTags);

    window.pageIsReady && window.pageIsReady();
  });




  function extractTagsFromMedia(media) {
    var tagFrequency = {};
    media.forEach(function (mediaItem) {
      mediaItem.tags.forEach(function (tagId) {
        tagFrequency[tagId] = (tagFrequency[tagId] || 0) + 1;
      });
    });

    var tags = Object.keys(tagFrequency).map(function (tagId) {
      return {
        id: tagId,
        frequency: tagFrequency[tagId],
      };
    });

    return tags;
  }

  function sortTagsByFrequencyDesc(tags) {
    return tags.slice().sort(function (a, b) {
      return b.frequency - a.frequency;
    });
  }

  function filterTagsByMinFrequency(tags, minFrequency) {
    return tags.filter(function (tag) {
      return tag.frequency >= minFrequency;
    });
  }

  function renderUserInfo(user) {
    $('#user img').attr('src', user.profile_picture);
    $('#user h1').text(user.username);
    $('#full-name').text(user.full_name);
    $('#bio').text(user.bio);
    $('#website').attr('href', user.website).text(user.website);
    $('#num-media').text(user.counts.media);
    $('#num-followers').text(user.counts.followed_by);
    $('#num-follows').text(user.counts.follows);
  }

  function renderUserMedia(media) {
    var container = $('.user-media');
    container.html(''); // Clear existing content
  
    media.forEach(function (mediaItem) {
      // Create a div element for each media item
      var div = $('<div>').addClass('user-media-item u-pull-left');
  
      // Construct the absolute URL for the media item
      var absoluteUrl = new URL(mediaItem.media_url, window.location.href).href;
  
      // Set background image using CSS background-image property
      div.css('background-image', 'url(' + absoluteUrl + ')');
  
      // Append the created div to the .user-media container
      container.append(div);
    });
  }
  

  function renderTags(tags) {
    var tagList = $('.tag-list ul');
    tagList.empty();

    tags.forEach(function (tag) {
      var li = $('<li>').addClass('u-pull-left');
      var a = $('<a>').text('#' + tag.id + ' (' + tag.frequency + ')');
      a.data('tagId', tag.id);
      a.on('click', handleClickTag);
      li.append(a);
      tagList.append(li);
    });
  }

  function handleClickTag(event) {
    var tagId = $(event.target).data('tagId');
    var filteredMedia = filterMediaByTag(tagId);
    renderUserMedia(filteredMedia);
  }

  function filterMediaByTag(tagId) {
    return userMedia.filter(function (mediaItem) {
      return mediaItem.tags.indexOf(tagId) !== -1;
    });
  }

});