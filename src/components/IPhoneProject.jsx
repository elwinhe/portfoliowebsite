import PropTypes from 'prop-types'

export default function IPhoneProject({
  // Screen props
  screenType = 'image', // 'image' | 'video'
  onScreenClick,
  imgSrc,
  imgAlt,
  videoRef,
  poster,
  videoSources,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  // Info props
  infoTitleSrc,
  infoTitleAlt,
  infoTitleId,
  infoDescription,
  infoLinkHref,
  infoLinkText = 'View case study',
}) {
  return (
    <div className="iphone">
      <div className="iphone-bezel">
        {/* Notch */}
        <div className="iphone-notch">
          <span className="notch-speaker"></span>
          <span className="notch-camera"></span>
        </div>

        {/* Screen */}
        {screenType === 'video' ? (
          <video
            ref={videoRef}
            onClick={onScreenClick}
            className="iphone-screen"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            poster={poster}
          >
            {Array.isArray(videoSources) && videoSources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        ) : (
          <img
            onClick={onScreenClick}
            className="iphone-screen"
            src={imgSrc}
            alt={imgAlt}
            loading="lazy"
          />
        )}
      </div>

      <div className="project-info">
        <img
          className="project-title"
          id={infoTitleId}
          src={infoTitleSrc}
          alt={infoTitleAlt}
        />
        <p className="project-description">{infoDescription}</p>
        <a href={infoLinkHref} target="_blank" rel="noopener noreferrer" className="project-link">
          {infoLinkText}
        </a>
      </div>
    </div>
  )
}

IPhoneProject.propTypes = {
  screenType: PropTypes.oneOf(['image', 'video']),
  onScreenClick: PropTypes.func,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  videoRef: PropTypes.oneOfType([
    // Allow passing React ref objects
    PropTypes.shape({ current: PropTypes.any }),
    // Or leave undefined
    PropTypes.any,
  ]),
  poster: PropTypes.string,
  videoSources: PropTypes.arrayOf(
    PropTypes.shape({ src: PropTypes.string.isRequired, type: PropTypes.string })
  ),
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  playsInline: PropTypes.bool,
  infoTitleSrc: PropTypes.string.isRequired,
  infoTitleAlt: PropTypes.string.isRequired,
  infoTitleId: PropTypes.string,
  infoDescription: PropTypes.string.isRequired,
  infoLinkHref: PropTypes.string.isRequired,
  infoLinkText: PropTypes.string,
}


