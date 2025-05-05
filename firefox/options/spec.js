export const page = {
  container:'.the-post',
       date:'.post-header .post-date',
      title:'.post-header .post-title',
    caption:'.wysiwyg, .wysiwyg-editor',
      image:'.post-thumbnail img.img-default',
       next:'.post-next-prev-buttons .post-next'
};

export const section = {
  container:'.post-content',
         id:'.post-content-inner',
      level:'.post-content-for',
      title:'.post-content-title',
    caption:'.post-content-body .type-text .wysiwyg',
       file:'.post-content-body .type-file .text-muted',
   download:'.post-content-body .type-file a.btn[download]',
  thumbnail:'.image-thumbnails .image-container img'
};

export const gallery = {
  container:'#image-slideshow',
       next:'a.move-button.next',
   exchange:'a.btn[href]',
      close:'a.btn .fa-close',
      image:'img',
   replacer:["/main_","/thumb_"]
};
