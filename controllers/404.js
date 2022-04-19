exports.getErrorPage = (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', 'error-page.html'));
    res.status(404).render('error-page', {
        pageTitle: 'Page not found',
        path: '',
        isAuthenticated: req.isLoggedIn
    });
}