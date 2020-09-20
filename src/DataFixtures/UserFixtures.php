<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        // $product = new Product();
        // $manager->persist($product);

        /**
         * Création des users
         */

        $userPictures = [
            "https://i.pinimg.com/originals/3b/10/a8/3b10a845ad9843b25552eb957728d47e.jpg",
            "https://c8.alamy.com/compfr/p9mywr/man-avatar-profil-p9mywr.jpg",
            "https://image.shutterstock.com/z/stock-vector-person-gray-photo-placeholder-woman-in-costume-on-white-background-1406263805.jpg",
            "https://img.icons8.com/clouds/2x/name.png",
            "https://img.icons8.com/cute-clipart/2x/name.png",
            "https://img.icons8.com/nolan/2x/name.png",
            "https://img.icons8.com/dusk/2x/cat-profile.png",
            "https://img.icons8.com/dusk/2x/edit-user-female.png",
            "https://img.icons8.com/dusk/2x/user-female-circle.png",
            "https://img.icons8.com/color/2x/edit-user-female.png",
            "https://img.icons8.com/color/2x/cat-profile.png",

        ];

        $youtubeLinks = [
            "https://www.youtube.com/watch?v=OpUWqlsLic8",
            "https://www.youtube.com/watch?v=o0YiZF9XZL0&ab_channel=DevEd",
            "https://www.youtube.com/watch?v=-liXLunc-JQ&list=RDJn9r0avp0fY&index=4&ab_channel=AnimenzPianoSheets",
            "https://www.youtube.com/watch?v=2M-uGZnixPA&list=RDJn9r0avp0fY&index=2",
            "https://www.youtube.com/watch?v=sEQf5lcnj_o&list=RDJn9r0avp0fY&index=6",
            "https://www.youtube.com/watch?v=sN93DRYkCO8&ab_channel=DevEd",
            "https://www.youtube.com/watch?v=BaJZC3zjHBQ&ab_channel=DevEd",
            "https://www.youtube.com/watch?v=ZeDP-rzOnAA&ab_channel=DevEd",
            "https://www.youtube.com/watch?v=0SPwwpruGIA&ab_channel=FoodInsider",
            "https://www.youtube.com/watch?v=8dDPyoeCBAg&ab_channel=FoodInsider",
            "https://www.youtube.com/watch?v=slHK9WNwDic&ab_channel=TastyTravel",
            "https://www.youtube.com/watch?v=rI1ZXRJrql8&ab_channel=AdenFilms",
            "https://www.youtube.com/watch?v=qX2bQQCrk8M&ab_channel=Francetvsport",
            "https://www.youtube.com/watch?v=3bxihqPKF08&ab_channel=GymDirect",
            "https://www.youtube.com/watch?v=O8ElQBIenN0&ab_channel=Femmeactuelle",
            "https://www.youtube.com/watch?v=pB6kBj1kW1o&ab_channel=GuuhDessins",
            "https://www.youtube.com/watch?v=1g43573NyIE&ab_channel=Youngaka",
            "https://www.youtube.com/watch?v=uwj3dG-K7r0&ab_channel=GuuhDessins",
            "https://www.youtube.com/watch?v=TMln8Q-KDjs&ab_channel=origamipapier",
            "https://www.youtube.com/watch?v=hXQxSi34GWY&ab_channel=EddievanderMeer",
            "https://www.youtube.com/watch?v=e_k-yLShHC8&ab_channel=EddievanderMeer"
        ];

        $user = new User();
        $encodedPassword = $this->encoder->encodePassword($user, "invite@invite.invite");
        $user->setPseudo($faker->firstName() . " " . $faker->lastName())
            ->setEmail("invite@invite.invite")
            ->setPassword($encodedPassword)
            ->setPicture("https://i.pinimg.com/originals/3b/10/a8/3b10a845ad9843b25552eb957728d47e.jpg");
        $manager->persist($user);

        for ($j = 0; $j < 20; $j++) {


            $post = new Post();
            $post->setTitle(ucfirst($faker->sentence()))
                ->setDescription(ucfirst($faker->sentence()))
                ->setDifficulty("Difficile")
                ->setHref($youtubeLinks[rand(0, count($youtubeLinks) - 1)])
                ->setUser($user)
                ->setCategory("food")
                ->setCreatedAt($faker->dateTimeBetween('-1 years'));
            $manager->persist($post);
        }



        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $encodedPassword = $this->encoder->encodePassword($user, "password");
            $user->setPseudo($faker->firstName() . " " . $faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($encodedPassword)
                ->setPicture($userPictures[$i]);
            $this->addReference('user' . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }
}
