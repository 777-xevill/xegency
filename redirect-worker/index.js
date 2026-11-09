// xegency.com (no www) is only ever redirected: www.xegency.com is the canonical
// address. A separate Worker keeps the main one free of this host check, so
// page views on www never invoke code.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = "www.xegency.com";
    return Response.redirect(url.toString(), 308);
  },
};
