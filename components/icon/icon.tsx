import type {NextPage} from 'next'

export enum IconVariant {
  'eye',
  'like',
  'likeFILL',
  'edit',
  'star',
  'follow',
  'fire',
  'plus',
  'close',
  'search',
  'arrowDOWN',
  'folder',
  'info',
  'palette',
  'send',
  'arrowRIGHT',
  'check',
}

interface IconControllerProps {
  id: IconVariant;
  size: number;
  color?: string;
}

const Icon: NextPage<IconControllerProps> = ({id, size, color}) => {

  const icons = [
    <svg key={0} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_161_842)">
        <path
          d="M19.3925 7.84907C18.1 5.74407 15.16 2.2124 10 2.2124C4.84004 2.2124 1.90004 5.74407 0.607543 7.84907C0.207983 8.49533 -0.00366211 9.24011 -0.00366211 9.99991C-0.00366211 10.7597 0.207983 11.5045 0.607543 12.1507C1.90004 14.2557 4.84004 17.7874 10 17.7874C15.16 17.7874 18.1 14.2557 19.3925 12.1507C19.7921 11.5045 20.0037 10.7597 20.0037 9.99991C20.0037 9.24011 19.7921 8.49533 19.3925 7.84907ZM17.9717 11.2782C16.8617 13.0832 14.3492 16.1207 10 16.1207C5.65088 16.1207 3.13838 13.0832 2.02838 11.2782C1.79099 10.8941 1.66525 10.4515 1.66525 9.99991C1.66525 9.54835 1.79099 9.1057 2.02838 8.72157C3.13838 6.91657 5.65088 3.87907 10 3.87907C14.3492 3.87907 16.8617 6.91324 17.9717 8.72157C18.2091 9.1057 18.3348 9.54835 18.3348 9.99991C18.3348 10.4515 18.2091 10.8941 17.9717 11.2782Z"/>
        <path
          d="M10 5.83324C9.17595 5.83324 8.37037 6.07761 7.68517 6.53544C6.99996 6.99328 6.46591 7.64402 6.15054 8.40538C5.83518 9.16674 5.75267 10.0045 5.91344 10.8128C6.07421 11.621 6.47105 12.3634 7.05376 12.9462C7.63648 13.5289 8.37891 13.9257 9.18717 14.0865C9.99542 14.2473 10.8332 14.1647 11.5946 13.8494C12.3559 13.534 13.0067 13 13.4645 12.3148C13.9223 11.6296 14.1667 10.824 14.1667 9.99989C14.1654 8.89523 13.726 7.83619 12.9449 7.05508C12.1637 6.27397 11.1047 5.83456 10 5.83324ZM10 12.4999C9.50559 12.4999 9.02224 12.3533 8.61112 12.0786C8.19999 11.8039 7.87956 11.4134 7.69034 10.9566C7.50112 10.4998 7.45162 9.99712 7.54808 9.51217C7.64454 9.02722 7.88264 8.58176 8.23228 8.23213C8.58191 7.8825 9.02736 7.6444 9.51232 7.54793C9.99727 7.45147 10.4999 7.50098 10.9568 7.6902C11.4136 7.87942 11.804 8.19985 12.0787 8.61097C12.3534 9.02209 12.5 9.50544 12.5 9.99989C12.5 10.6629 12.2367 11.2988 11.7678 11.7677C11.299 12.2365 10.6631 12.4999 10 12.4999Z"/>
      </g>
      <defs>
        <clipPath id="clip0_161_842">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={1} viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5833 1.59766C14.645 1.61225 13.727 1.8742 12.9223 2.35705C12.1176 2.8399 11.4545 3.52655 11 4.34766C10.5455 3.52655 9.88244 2.8399 9.0777 2.35705C8.27295 1.8742 7.35504 1.61225 6.41667 1.59766C4.92079 1.66265 3.51143 2.31703 2.49649 3.41785C1.48156 4.51867 0.943547 5.97643 1.00001 7.47266C1.00001 11.2618 4.98834 15.4002 8.33333 18.206C9.08018 18.8336 10.0245 19.1777 11 19.1777C11.9755 19.1777 12.9198 18.8336 13.6667 18.206C17.0117 15.4002 21 11.2618 21 7.47266C21.0565 5.97643 20.5184 4.51867 19.5035 3.41785C18.4886 2.31703 17.0792 1.66265 15.5833 1.59766ZM12.5958 16.931C12.1492 17.3071 11.584 17.5134 11 17.5134C10.416 17.5134 9.85085 17.3071 9.40417 16.931C5.1225 13.3385 2.66667 9.89182 2.66667 7.47266C2.60971 6.41825 2.97198 5.3841 3.67447 4.59574C4.37697 3.80738 5.3627 3.32878 6.41667 3.26432C7.47064 3.32878 8.45637 3.80738 9.15886 4.59574C9.86136 5.3841 10.2236 6.41825 10.1667 7.47266C10.1667 7.69367 10.2545 7.90563 10.4107 8.06191C10.567 8.21819 10.779 8.30599 11 8.30599C11.221 8.30599 11.433 8.21819 11.5893 8.06191C11.7455 7.90563 11.8333 7.69367 11.8333 7.47266C11.7764 6.41825 12.1386 5.3841 12.8411 4.59574C13.5436 3.80738 14.5294 3.32878 15.5833 3.26432C16.6373 3.32878 17.623 3.80738 18.3255 4.59574C19.028 5.3841 19.3903 6.41825 19.3333 7.47266C19.3333 9.89182 16.8775 13.3385 12.5958 16.9277V16.931Z"/>
    </svg>,
    <svg key={2}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_161_861)">
        <path
          d="M14.5833 0.597656C13.645 0.612252 12.727 0.874201 11.9223 1.35705C11.1175 1.8399 10.4545 2.52655 10 3.34766C9.54553 2.52655 8.88244 1.8399 8.0777 1.35705C7.27295 0.874201 6.35504 0.612252 5.41667 0.597656C3.92079 0.662649 2.51143 1.31703 1.49649 2.41785C0.481555 3.51867 -0.0564528 4.97643 5.92833e-06 6.47266C5.92833e-06 10.2618 3.98834 14.4002 7.33333 17.206C8.08018 17.8336 9.02446 18.1777 10 18.1777C10.9755 18.1777 11.9198 17.8336 12.6667 17.206C16.0117 14.4002 20 10.2618 20 6.47266C20.0564 4.97643 19.5184 3.51867 18.5035 2.41785C17.4886 1.31703 16.0792 0.662649 14.5833 0.597656Z"/>
      </g>
      <defs>
        <clipPath id="clip0_161_861">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={3}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_161_836)">
        <path
          d="M19.1167 0.883385C18.5501 0.317717 17.7823 0 16.9817 0C16.1811 0 15.4132 0.317717 14.8467 0.883385L0 15.73V20H4.27L19.1167 5.15338C19.6821 4.58674 19.9997 3.81891 19.9997 3.01838C19.9997 2.21786 19.6821 1.45003 19.1167 0.883385ZM3.58333 18.3334H1.66667V16.4167L12.7583 5.33338L14.675 7.25005L3.58333 18.3334ZM17.9383 3.97505L15.8492 6.06422L13.9367 4.14755L16.025 2.06172C16.2792 1.80755 16.6239 1.66476 16.9833 1.66476C17.3428 1.66476 17.6875 1.80755 17.9417 2.06172C18.1958 2.31588 18.3386 2.66061 18.3386 3.02005C18.3386 3.3795 18.1958 3.72422 17.9417 3.97838L17.9383 3.97505Z"/>
      </g>
      <defs>
        <clipPath id="clip0_161_836">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={4}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_161_835)">
        <path
          d="M19.8634 7.32821C19.6929 6.78562 19.3524 6.3123 18.8921 5.97824C18.4318 5.64417 17.8763 5.4671 17.3076 5.47321H13.6667L12.5609 2.02655C12.387 1.48401 12.0453 1.01072 11.585 0.674935C11.1248 0.339144 10.5698 0.158203 10.0001 0.158203C9.43033 0.158203 8.87533 0.339144 8.41508 0.674935C7.95483 1.01072 7.61311 1.48401 7.43922 2.02655L6.33338 5.47321H2.69254C2.12566 5.47402 1.57353 5.65395 1.11502 5.9873C0.656513 6.32065 0.315073 6.79037 0.139473 7.32936C-0.0361263 7.86836 -0.0369035 8.44907 0.137253 8.98853C0.311409 9.528 0.65159 9.99863 1.10921 10.3332L4.07254 12.4999L2.94588 15.989C2.7638 16.5302 2.7615 17.1157 2.9393 17.6583C3.11711 18.2008 3.4655 18.6714 3.93254 18.9999C4.39159 19.3389 4.94787 19.5204 5.51851 19.5176C6.08914 19.5147 6.64358 19.3276 7.09922 18.984L10.0001 16.849L12.9017 18.9815C13.3599 19.3186 13.9132 19.5016 14.482 19.5044C15.0508 19.5072 15.6059 19.3295 16.0674 18.997C16.5288 18.6644 16.873 18.1941 17.0503 17.6536C17.2276 17.1131 17.229 16.5303 17.0542 15.989L15.9276 12.4999L18.8942 10.3332C19.3571 10.0028 19.7013 9.5322 19.8758 8.99099C20.0504 8.44978 20.046 7.86675 19.8634 7.32821ZM17.9109 8.98737L14.4576 11.5115C14.3157 11.615 14.2102 11.7606 14.156 11.9276C14.1018 12.0947 14.1018 12.2745 14.1559 12.4415L15.4684 16.4999C15.5348 16.7057 15.5342 16.9273 15.4668 17.1328C15.3993 17.3383 15.2684 17.5171 15.0929 17.6435C14.9174 17.7699 14.7064 17.8374 14.4901 17.8363C14.2738 17.8352 14.0634 17.7656 13.8892 17.6374L10.4934 15.1374C10.3504 15.0323 10.1775 14.9757 10.0001 14.9757C9.82258 14.9757 9.64975 15.0323 9.50672 15.1374L6.11088 17.6374C5.93678 17.7673 5.72583 17.8384 5.5086 17.8404C5.29137 17.8423 5.07916 17.7751 4.90274 17.6483C4.72631 17.5216 4.59484 17.3419 4.52738 17.1354C4.45991 16.9289 4.45997 16.7063 4.52754 16.4999L5.84421 12.4415C5.89831 12.2745 5.89827 12.0947 5.8441 11.9276C5.78993 11.7606 5.68439 11.615 5.54255 11.5115L2.08921 8.98737C1.91529 8.86004 1.78607 8.681 1.71999 8.47583C1.65391 8.27066 1.65436 8.04985 1.72128 7.84496C1.78819 7.64006 1.91814 7.46155 2.09258 7.33492C2.26701 7.20829 2.47699 7.14003 2.69254 7.13988H6.94255C7.11898 7.13987 7.29085 7.08387 7.43342 6.97994C7.57599 6.87601 7.6819 6.72951 7.73588 6.56154L9.02755 2.53571C9.09385 2.3297 9.22381 2.15004 9.39872 2.02259C9.57363 1.89513 9.78447 1.82647 10.0009 1.82647C10.2173 1.82647 10.4281 1.89513 10.6031 2.02259C10.778 2.15004 10.9079 2.3297 10.9742 2.53571L12.2659 6.56154C12.3199 6.72951 12.4258 6.87601 12.5683 6.97994C12.7109 7.08387 12.8828 7.13987 13.0592 7.13988H17.3092C17.5248 7.14003 17.7348 7.20829 17.9092 7.33492C18.0836 7.46155 18.2136 7.64006 18.2805 7.84496C18.3474 8.04985 18.3479 8.27066 18.2818 8.47583C18.2157 8.681 18.0865 8.86004 17.9126 8.98737H17.9109Z"/>
      </g>
      <defs>
        <clipPath id="clip0_161_835">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={5}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_161_834)">
        <path
          d="M7.5 10C6.51109 10 5.54439 9.70675 4.72215 9.15735C3.8999 8.60794 3.25904 7.82705 2.8806 6.91342C2.50216 5.99979 2.40315 4.99445 2.59607 4.02455C2.789 3.05464 3.2652 2.16373 3.96447 1.46447C4.66373 0.765206 5.55464 0.289002 6.52455 0.0960758C7.49445 -0.0968502 8.49978 0.00216642 9.41341 0.380604C10.327 0.759043 11.1079 1.3999 11.6573 2.22215C12.2067 3.0444 12.5 4.01109 12.5 5C12.4987 6.32568 11.9715 7.59668 11.0341 8.53407C10.0967 9.47147 8.82567 9.99868 7.5 10ZM7.5 1.66667C6.84073 1.66667 6.19626 1.86216 5.6481 2.22844C5.09993 2.59471 4.67269 3.1153 4.4204 3.72439C4.16811 4.33348 4.1021 5.0037 4.23071 5.6503C4.35933 6.2969 4.6768 6.89085 5.14298 7.35702C5.60915 7.8232 6.20309 8.14067 6.8497 8.26928C7.4963 8.3979 8.16652 8.33189 8.77561 8.0796C9.38469 7.82731 9.90529 7.40006 10.2716 6.8519C10.6378 6.30374 10.8333 5.65927 10.8333 5C10.8333 4.11595 10.4821 3.2681 9.85702 2.64298C9.2319 2.01786 8.38405 1.66667 7.5 1.66667Z"/>
        <path
          d="M15 20H13.3333V15.7975C13.3324 15.1442 13.0725 14.518 12.6106 14.056C12.1487 13.5941 11.5224 13.3342 10.8692 13.3333H4.13083C3.47756 13.3342 2.85131 13.5941 2.38938 14.056C1.92745 14.518 1.66755 15.1442 1.66667 15.7975V20H0V15.7975C0.00132319 14.7023 0.436959 13.6524 1.21135 12.878C1.98575 12.1036 3.03567 11.668 4.13083 11.6667H10.8692C11.9643 11.668 13.0142 12.1036 13.7886 12.878C14.563 13.6524 14.9987 14.7023 15 15.7975V20Z"/>
        <path
          d="M18.3333 6.5625C17.8695 6.5856 17.4338 6.79147 17.1215 7.13506C16.8091 7.47865 16.6456 7.93197 16.6667 8.39584C16.6877 7.93197 16.5242 7.47865 16.2118 7.13506C15.8995 6.79147 15.4638 6.5856 15 6.5625C14.5362 6.5856 14.1005 6.79147 13.7881 7.13506C13.4758 7.47865 13.3123 7.93197 13.3333 8.39584C13.3333 10.3125 16.6667 12.6733 16.6667 12.6733C16.6667 12.6733 20 10.3158 20 8.39584C20.021 7.93197 19.8575 7.47865 19.5452 7.13506C19.2328 6.79147 18.7971 6.5856 18.3333 6.5625Z"/>
      </g>
      <defs>
        <clipPath id="clip0_161_834">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={6}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.6517 3.3894C12.6529 2.54291 11.6241 1.66479 10.5829 0.626895L9.98945 0.0375977L9.40683 0.627715C7.53242 2.50713 6.64683 5.39283 6.2623 7.12408C5.96797 6.66787 5.74957 6.16698 5.61559 5.64088L5.26352 4.2817L4.23977 5.24389C2.44602 6.92764 1.24996 8.59815 1.24996 11.2732C1.21551 15.2433 3.88621 18.7279 7.72883 19.7264C8.29152 19.8633 8.8659 19.9469 9.44426 19.9761C9.63426 19.9898 10.1784 20.0035 10.2716 19.9977C14.9859 19.8559 18.7328 15.9913 18.7289 11.2749C18.7289 7.70088 16.3759 5.70326 13.6517 3.3894ZM10.1507 18.3223C10.0635 18.3298 9.98429 18.3306 9.89613 18.3298C8.33972 18.2822 7.1016 17.0087 7.09781 15.4516C7.09781 14.3969 7.66348 13.8711 8.94367 12.7814C9.2664 12.5069 9.61746 12.2083 9.98679 11.8664C10.3104 12.16 10.6248 12.4262 10.9151 12.6733C12.2011 13.7646 12.8724 14.3844 12.8724 15.4491C12.8695 16.9766 11.6758 18.2368 10.1507 18.3223ZM14.3265 16.8491L14.3098 16.8607C14.4591 16.4059 14.5355 15.9303 14.5361 15.4516C14.5361 13.5675 13.3 12.5177 11.9923 11.4072C11.529 11.0146 11.0507 10.6086 10.5732 10.1311L9.98429 9.54299L9.39617 10.1311C8.85715 10.6693 8.32976 11.1185 7.86476 11.5145C6.56043 12.6242 5.43328 13.5833 5.43328 15.4516C5.43504 15.9508 5.51937 16.4464 5.68285 16.9181C3.92762 15.5703 2.90317 13.4796 2.91367 11.2666C2.9 9.8069 3.46496 8.40116 4.485 7.35694C4.6607 7.71338 4.86898 8.05284 5.10723 8.37096C5.46281 8.8508 6.06957 9.07342 6.65113 8.93744C7.24234 8.8058 7.70199 8.34065 7.82652 7.74791C8.17484 5.83604 8.92816 4.02084 10.0359 2.42412C10.9135 3.25596 11.7828 3.99213 12.5672 4.65846C15.1725 6.87115 17.0591 8.46994 17.0591 11.2716C17.0633 13.4543 16.0533 15.5151 14.3257 16.8491H14.3265Z"/>
    </svg>,
    <svg key={7}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9.16667H10.8333V0H9.16667V9.16667H0V10.8333H9.16667V20H10.8333V10.8333H20V9.16667Z"/>
    </svg>,
    <svg key={8}  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_166_660)">
        <path
          d="M17.6603 16.4819L11.1785 10L17.6603 3.51823L16.4818 2.33972L10 8.82153L3.51819 2.33972L2.33968 3.51823L8.82149 10L2.33968 16.4819L3.51819 17.6604L10 11.1786L16.4818 17.6604L17.6603 16.4819Z"/>
      </g>
      <defs>
        <clipPath id="clip0_166_660">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={9} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.7663 18.5889L14.7962 13.6188C16.1506 11.9623 16.8165 9.84866 16.6562 7.71497C16.4959 5.58128 15.5216 3.59083 13.9349 2.15534C12.3482 0.719841 10.2704 -0.0508742 8.13136 0.00260835C5.99233 0.0560909 3.95568 0.929679 2.44268 2.44268C0.929679 3.95568 0.0560909 5.99233 0.00260835 8.13136C-0.0508742 10.2704 0.719841 12.3482 2.15534 13.9349C3.59083 15.5216 5.58128 16.4959 7.71497 16.6562C9.84866 16.8165 11.9623 16.1506 13.6188 14.7962L18.5889 19.7663C18.7459 19.9179 18.9563 20.0019 19.1746 20C19.3929 19.9981 19.6017 19.9105 19.7561 19.7561C19.9105 19.6017 19.9981 19.3929 20 19.1746C20.0019 18.9563 19.9179 18.7459 19.7663 18.5889ZM8.35314 15.0143C7.03568 15.0143 5.74781 14.6237 4.65238 13.8917C3.55695 13.1598 2.70317 12.1194 2.199 10.9023C1.69483 9.6851 1.56292 8.34575 1.81994 7.05361C2.07697 5.76146 2.71138 4.57455 3.64297 3.64297C4.57455 2.71138 5.76146 2.07697 7.05361 1.81994C8.34575 1.56292 9.6851 1.69483 10.9023 2.199C12.1194 2.70317 13.1598 3.55695 13.8917 4.65238C14.6237 5.74781 15.0143 7.03568 15.0143 8.35314C15.0124 10.1192 14.3099 11.8123 13.0611 13.0611C11.8123 14.3099 10.1192 15.0124 8.35314 15.0143Z"/>
    </svg>,
    <svg key={10} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_166_655)">
        <path
          d="M18.8217 4.94092L10.5892 13.1734C10.4307 13.3255 10.2196 13.4104 10 13.4104C9.78039 13.4104 9.56928 13.3255 9.41084 13.1734L1.18334 4.94508L0.00500488 6.12342L8.23251 14.3518C8.70905 14.8059 9.34211 15.0593 10.0004 15.0593C10.6587 15.0593 11.2918 14.8059 11.7683 14.3518L20 6.11925L18.8217 4.94092Z"/>
      </g>
      <defs>
        <clipPath id="clip0_166_655">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={11} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_166_672)">
        <path
          d="M13.3333 12.6667C13.3333 12.8877 13.2455 13.0997 13.0892 13.2559C12.933 13.4122 12.721 13.5 12.5 13.5H10.8333V15.1667C10.8333 15.3877 10.7455 15.5997 10.5892 15.7559C10.433 15.9122 10.221 16 9.99999 16C9.77898 16 9.56702 15.9122 9.41074 15.7559C9.25446 15.5997 9.16666 15.3877 9.16666 15.1667V13.5H7.5C7.27898 13.5 7.06702 13.4122 6.91074 13.2559C6.75446 13.0997 6.66666 12.8877 6.66666 12.6667C6.66666 12.4457 6.75446 12.2337 6.91074 12.0774C7.06702 11.9211 7.27898 11.8333 7.5 11.8333H9.16666V10.1667C9.16666 9.94566 9.25446 9.7337 9.41074 9.57742C9.56702 9.42114 9.77898 9.33334 9.99999 9.33334C10.221 9.33334 10.433 9.42114 10.5892 9.57742C10.7455 9.7337 10.8333 9.94566 10.8333 10.1667V11.8333H12.5C12.721 11.8333 12.933 11.9211 13.0892 12.0774C13.2455 12.2337 13.3333 12.4457 13.3333 12.6667ZM20 6.83334V15.1667C19.9987 16.2713 19.5593 17.3304 18.7781 18.1115C17.997 18.8926 16.938 19.332 15.8333 19.3334H4.16666C3.062 19.332 2.00296 18.8926 1.22185 18.1115C0.440735 17.3304 0.00132321 16.2713 0 15.1667L0 5.16667C0.00132321 4.06201 0.440735 3.00297 1.22185 2.22185C2.00296 1.44074 3.062 1.00132 4.16666 1H6.27333C6.66116 1.00032 7.04366 1.09045 7.39083 1.26333L10.0208 2.58333C10.137 2.6391 10.2644 2.66761 10.3933 2.66667H15.8333C16.938 2.66799 17.997 3.1074 18.7781 3.88852C19.5593 4.66964 19.9987 5.72868 20 6.83334ZM1.66667 5.16667V6H18.18C18.0083 5.51425 17.6906 5.09341 17.2706 4.79508C16.8505 4.49674 16.3485 4.33547 15.8333 4.33334H10.3933C10.0055 4.33301 9.623 4.24288 9.27583 4.07L6.64583 2.75417C6.52997 2.69696 6.40255 2.66703 6.27333 2.66667H4.16666C3.50362 2.66667 2.86774 2.93006 2.3989 3.3989C1.93006 3.86774 1.66667 4.50363 1.66667 5.16667ZM18.3333 15.1667V7.66667H1.66667V15.1667C1.66667 15.8297 1.93006 16.4656 2.3989 16.9344C2.86774 17.4033 3.50362 17.6667 4.16666 17.6667H15.8333C16.4964 17.6667 17.1322 17.4033 17.6011 16.9344C18.0699 16.4656 18.3333 15.8297 18.3333 15.1667Z"/>
      </g>
      <defs>
        <clipPath id="clip0_166_672">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={12} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_166_673)">
        <path
          d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433283 8.00042 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34871 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99075 1.82679 8.37424C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.942 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74065 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4521 12.2094 18.3309 10 18.3333Z"/>
        <path
          d="M10 8.33333H9.16667C8.94566 8.33333 8.7337 8.42113 8.57742 8.57741C8.42114 8.73369 8.33334 8.94565 8.33334 9.16667C8.33334 9.38768 8.42114 9.59965 8.57742 9.75593C8.7337 9.91221 8.94566 10 9.16667 10H10V15C10 15.221 10.0878 15.433 10.2441 15.5893C10.4004 15.7456 10.6123 15.8334 10.8333 15.8334C11.0544 15.8334 11.2663 15.7456 11.4226 15.5893C11.5789 15.433 11.6667 15.221 11.6667 15V10C11.6667 9.55798 11.4911 9.13405 11.1785 8.82149C10.866 8.50893 10.442 8.33333 10 8.33333Z"/>
        <path
          d="M10 6.66668C10.6904 6.66668 11.25 6.10703 11.25 5.41667C11.25 4.72631 10.6904 4.16667 10 4.16667C9.30965 4.16667 8.75 4.72631 8.75 5.41667C8.75 6.10703 9.30965 6.66668 10 6.66668Z"/>
      </g>
      <defs>
        <clipPath id="clip0_166_673">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={13} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_169_1479)">
        <path
          d="M14.5833 9.16632C15.2737 9.16632 15.8333 8.60667 15.8333 7.91632C15.8333 7.22596 15.2737 6.66632 14.5833 6.66632C13.893 6.66632 13.3333 7.22596 13.3333 7.91632C13.3333 8.60667 13.893 9.16632 14.5833 9.16632Z"/>
        <path
          d="M10.4167 6.66633C11.107 6.66633 11.6667 6.10668 11.6667 5.41632C11.6667 4.72596 11.107 4.16632 10.4167 4.16632C9.72631 4.16632 9.16667 4.72596 9.16667 5.41632C9.16667 6.10668 9.72631 6.66633 10.4167 6.66633Z"/>
        <path
          d="M6.25 9.16632C6.94036 9.16632 7.5 8.60667 7.5 7.91632C7.5 7.22596 6.94036 6.66632 6.25 6.66632C5.55964 6.66632 5 7.22596 5 7.91632C5 8.60667 5.55964 9.16632 6.25 9.16632Z"/>
        <path
          d="M6.25 14.1663C6.94036 14.1663 7.5 13.6067 7.5 12.9163C7.5 12.226 6.94036 11.6663 6.25 11.6663C5.55964 11.6663 5 12.226 5 12.9163C5 13.6067 5.55964 14.1663 6.25 14.1663Z"/>
        <path
          d="M10.0692 19.9997C8.07689 19.9995 6.13006 19.4042 4.47835 18.2902C2.82664 17.1761 1.54534 15.5941 0.798757 13.747C0.0521739 11.8999 -0.125657 9.87189 0.288068 7.92303C0.701794 5.97417 1.68821 4.19331 3.12084 2.80882C4.08318 1.87109 5.22627 1.13897 6.48054 0.657034C7.7348 0.175098 9.07402 -0.0465821 10.4167 0.00548629C12.954 0.123913 15.3542 1.19131 17.1415 2.9961C18.9289 4.80089 19.9729 7.21134 20.0667 9.74966C20.1006 11.0441 19.8812 12.3327 19.4209 13.543C19.3272 13.7896 19.1729 14.0086 18.9724 14.18C18.7719 14.3514 18.5315 14.4696 18.2734 14.5238C18.011 14.5816 17.7382 14.5721 17.4805 14.4962C17.2227 14.4203 16.9884 14.2805 16.7992 14.0897L16.7159 14.0063C16.2986 13.5891 15.7666 13.3055 15.1876 13.1917C14.6086 13.0778 14.0089 13.1388 13.4647 13.367C12.9205 13.5952 12.4566 13.9801 12.1319 14.4729C11.8073 14.9656 11.6366 15.5438 11.6417 16.1338L11.675 19.8972L10.905 19.9613C10.6275 19.9813 10.3508 19.9997 10.0692 19.9997ZM10.0692 1.66632C7.85904 1.65638 5.73547 2.52481 4.16563 4.08058C2.5958 5.63635 1.70828 7.75202 1.69834 9.96216C1.68839 12.1723 2.55683 14.2959 4.1126 15.8657C5.66837 17.4355 7.78404 18.3231 9.99418 18.333L9.97418 16.1455C9.97041 15.5297 10.0886 14.9192 10.3218 14.3492C10.5551 13.7793 10.8989 13.2611 11.3334 12.8247C12.2037 11.9555 13.3834 11.4673 14.6134 11.4673C15.8433 11.4673 17.0231 11.9555 17.8934 12.8247L17.905 12.8363C18.2606 11.8613 18.4288 10.8279 18.4009 9.79049C18.323 7.67594 17.4535 5.66781 15.9649 4.16404C14.4762 2.66027 12.477 1.7706 10.3633 1.67132C10.2642 1.66632 10.1675 1.66632 10.0692 1.66632Z"/>
      </g>
      <defs>
        <clipPath id="clip0_169_1479">
          <rect width="20" height="20"/>
        </clipPath>
      </defs>
    </svg>,
    <svg key={14} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.2659 0.734991C18.9671 0.432597 18.5954 0.212371 18.1866 0.0955883C17.7779 -0.0211941 17.346 -0.0305844 16.9325 0.0683246L3.59919 2.87666C2.83134 2.98196 2.10814 3.29955 1.51103 3.79367C0.913921 4.28778 0.466623 4.93879 0.219508 5.67338C-0.0276071 6.40797 -0.0647234 7.19696 0.112339 7.9515C0.289401 8.70605 0.673609 9.39617 1.2217 9.94415L2.65336 11.375C2.73085 11.4525 2.7923 11.5444 2.8342 11.6457C2.87609 11.7469 2.89761 11.8554 2.89753 11.965V14.605C2.89937 14.9762 2.98482 15.3422 3.14753 15.6758L3.14086 15.6817L3.16253 15.7033C3.40671 16.1943 3.80551 16.5913 4.29753 16.8333L4.31919 16.855L4.32503 16.8483C4.65866 17.011 5.02467 17.0965 5.39586 17.0983H8.03586C8.25674 17.0981 8.46865 17.1857 8.62503 17.3417L10.0559 18.7725C10.4396 19.1605 10.8964 19.4687 11.3998 19.6794C11.9033 19.8901 12.4434 19.999 12.9892 20C13.444 19.9994 13.8957 19.9251 14.3267 19.78C15.0546 19.541 15.7012 19.1033 16.1936 18.5164C16.6859 17.9295 17.0045 17.2167 17.1134 16.4583L19.9259 3.09582C20.0299 2.67886 20.0238 2.24201 19.9081 1.82813C19.7924 1.41425 19.5711 1.03755 19.2659 0.734991ZM3.83336 10.1983L2.40086 8.76749C2.06729 8.44195 1.83351 8.02803 1.72693 7.57429C1.62036 7.12054 1.64543 6.64582 1.7992 6.20582C1.94827 5.75443 2.22387 5.35534 2.59319 5.05604C2.96252 4.75674 3.41004 4.56981 3.88253 4.51749L17.0834 1.73832L4.56253 14.2608V11.965C4.56379 11.6369 4.5 11.3119 4.37484 11.0086C4.24968 10.7054 4.06564 10.43 3.83336 10.1983ZM15.4759 16.1733C15.4119 16.6336 15.2209 17.0669 14.9243 17.4247C14.6277 17.7824 14.2373 18.0504 13.7968 18.1986C13.3564 18.3468 12.8833 18.3693 12.4308 18.2635C11.9783 18.1578 11.5642 17.928 11.235 17.6L9.80169 16.1667C9.57034 15.934 9.29515 15.7496 8.99204 15.624C8.68894 15.4984 8.36395 15.4342 8.03586 15.435H5.74003L18.2625 2.91666L15.4759 16.1733Z"/>
    </svg>,
    <svg key={15} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8.73128H6.23042L9.77683 5.42129L8.25401 4L3.63064 8.31515C3.22684 8.69214 3 9.20338 3 9.73644C3 10.2695 3.22684 10.7807 3.63064 11.1577L8.25401 15.4729L9.77683 14.0516L6.23042 10.7416H17V8.73128Z"/>
    </svg>,
    <svg key={16} width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.45766 14.4377C5.88994 14.4379 5.34547 14.2123 4.94438 13.8105L0.369217 9.23705C-0.123072 8.74461 -0.123072 7.94635 0.369217 7.4539C0.861665 6.96161 1.65992 6.96161 2.15237 7.4539L6.45766 11.7592L17.8476 0.369217C18.3401 -0.123072 19.1383 -0.123072 19.6308 0.369217C20.1231 0.861665 20.1231 1.65992 19.6308 2.15237L7.97094 13.8105C7.56984 14.2123 7.02538 14.4379 6.45766 14.4377Z"/>
    </svg>
  ]

  return (
    <div
      style={{width: size, height: size, fill: color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {
        icons[id]
      }
    </div>
  );
};

export default Icon;