<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class PostFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $difficulties = ['Facile', 'Intermédiaire', 'Diffcile'];
        $categories = ['Sport', 'Food', 'Coding', 'Dessin', 'Musique'];
        $faker = Factory::create('fr_FR');
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
        /**
         * Création des postes
         */


        for ($j = 0; $j < 100; $j++) {
            $reference = "user" . rand(0, 9);

            $post = new Post();
            $post->setTitle(ucfirst($faker->sentence()))
                ->setDescription(($faker->text()))
                ->setDifficulty($difficulties[rand(0, count($difficulties) - 1)])
                ->setHref($youtubeLinks[rand(0, count($youtubeLinks) - 1)])
                ->setUser($this->getReference('user' . rand(0, 9)))
                ->setCategory($categories[rand(0, count($categories) - 1)])
                ->setPreRequis("Du pain, Du sel, De la confiture")
                ->setCreatedAt($faker->dateTimeBetween('-1 years'));
            $manager->persist($post);

            $this->addReference("post" . $j, $post);
        }


        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
